
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";

export default function GetTherapistByUserIdUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["getTherapistByUserId"]  {
    
    return async (user_id:number) => {
        return await Repository.getTherapistByUserId(user_id)
    }
}
