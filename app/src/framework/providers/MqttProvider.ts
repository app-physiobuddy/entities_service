import mqtt from 'mqtt';

const host = process.env.EMQX_BROKER_SERVICE_HOST 
const port = process.env.EMQX_PORT
const username = process.env.EMQX_USER
const password = process.env.EMQX_PASSWORD

class MqttProvider {
    private client: mqtt.MqttClient;
    constructor() {
        this.client = mqtt.connect({
            host: host,
            port: Number(port),
            protocol: 'mqtt',
            username: username, 
            password: password
          });
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
        })
        this.client.on('error', (error) => {
            console.error('MQTT Connection Error:', error);
        });
    }
    publishNewTherapist(therapist_user_id:number) {
        const topic = 'therapist';
        const message =  `Therapist user_id ${therapist_user_id} added`
        this.client.publish(topic, message, { qos: 2 }, (error) => {
            if (error) {
                console.error('Publish error:', error);
            } else {
                console.log(`Message published to therapist/: ${therapist_user_id}`);
            }
        });
    }
    publishNewPatient(patient_user_id:number) {
        const topic = 'patient';
        const message =  `Patient user_id ${patient_user_id} added`
        this.client.publish(topic, message, { qos: 2 }, (error) => {
            if (error) {
                console.error('Publish error:', error);
            } else {
                console.log(`Message published to patient/: ${patient_user_id}`);
            }
        });
    }
    
}

export default MqttProvider