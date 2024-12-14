

import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";

export default function DeleteCompanyUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["deleteCompany"]  {
    
    return async (user_id:number) => {
        return await Repository.deleteCompany(user_id)
    }
}
