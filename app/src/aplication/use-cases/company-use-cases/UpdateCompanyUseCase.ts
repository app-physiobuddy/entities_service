
import { Company } from "../../entities/Entities";
import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";

export default function UpdateCompanyUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["updateCompany"]  {
    
    return async (data: Company) => {
        return await Repository.updateCompany(data)
    }
}

