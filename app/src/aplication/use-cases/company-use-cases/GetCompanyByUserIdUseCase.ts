
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";

export default function GetCompanyByUserIdUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["getCompanyByUserId"]  {
    
    return async (user_id:number) => {
        return await Repository.getCompanyByUserId(user_id)
    }
}
