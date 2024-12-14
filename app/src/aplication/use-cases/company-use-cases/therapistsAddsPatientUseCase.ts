

import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";
import { Pacient } from "../../entities/Entities";
import MqttProvider from "../../../framework/providers/MqttProvider";

export default function TherapistsAddsPatientUseCase (Repository: DbGatewayContract["companyRepository"], mqtt: InstanceType<typeof MqttProvider>)
: CompanyUseCasesInterface["createPatient"]  {
    
    return async (patient: Pacient) => {
        const result = await Repository.createPatient(patient)
        if (result) {
            mqtt.publishNewPatient(patient.user_id)
        }
        return result
    }
}
