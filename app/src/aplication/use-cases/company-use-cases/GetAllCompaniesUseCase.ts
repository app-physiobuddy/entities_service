import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";

export default function GetAllCompaniesUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["getAllCompanies"]  {
    
    return async () => {
        return await Repository.getAllCompanies()
    }
}
