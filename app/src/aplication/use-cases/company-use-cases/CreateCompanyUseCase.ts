
import { Company } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";

export default function CreateCompanyUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["createCompany"]  {
    
    return async (data: Company) => {
        return await Repository.createCompany(data)
    }
}
