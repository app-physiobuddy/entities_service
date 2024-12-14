
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";
import ErrorTypes from "../../../utils/errors/ErrorTypes.js";
export default function GetPatientsByTherapistUserIdUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["getPatientsByTherapistId"]  {
    
    return async (user_id:number) => {
        const therapist = await Repository.getTherapistByUserId(user_id)
        if (!therapist) throw ErrorTypes.NotFoundError('Error getting therapist. It may not exist')
        const physio_id = Number(therapist.physio_id)


        const result = await Repository.getPatientsByTherapistId(physio_id)
        return result
    }
}
