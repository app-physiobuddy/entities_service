//GetAllPatientsByPatientUserIdUseCase
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";
import ErrorTypes from "../../../utils/errors/ErrorTypes.js";
export default function GetAllPatientsByPatientUserIdUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["getPatientsByPatientUserId"]  {
    
    return async (user_id:number) => {

        const result = await Repository.getPatientsByPatientUserId(user_id)
        return result
    }
}
