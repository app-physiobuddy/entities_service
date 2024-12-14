
import { Company } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";
import { Physiotherapist } from "../../entities/Entities";
import MqttProvider from "../../../framework/providers/MqttProvider";

export default function addTherapistUseCase (Repository: DbGatewayContract["companyRepository"], mqtt: InstanceType<typeof MqttProvider>)
: CompanyUseCasesInterface["createTherapist"]  {
    
    return async (therapist: Physiotherapist) => {
        const result = await Repository.createTherapist(therapist)
        if (result) {
            mqtt.publishNewTherapist(therapist.user_id)

        }
        return result
    }
}
