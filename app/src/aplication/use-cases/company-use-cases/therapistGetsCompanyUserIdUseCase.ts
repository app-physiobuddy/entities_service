//therapistGetsCompanyUserIdUseCase


import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";
import ErrorTypes from "../../../utils/errors/ErrorTypes.js";

export default function TherapistGetsCompanyUserIdUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["therapistGetsCompanyUserId"]  {
    
    return async (user_id:number, company_id:number) => {
        //check if therapists is in that company first
        const therapist = await Repository.getTherapistByUserId(user_id)
        if (!therapist) throw ErrorTypes.NotFoundError('Error getting therapist. It may not exist')
            

        if (company_id !== therapist.company_id) {
            throw ErrorTypes.UnauthorizedAccess('Therapist does not belong to company')}
        const result =  await Repository.getCompanyUserIdByCompanyId(company_id)
        return result
    }
}
