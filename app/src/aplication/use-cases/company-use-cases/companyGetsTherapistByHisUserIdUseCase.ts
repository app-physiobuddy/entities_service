//companyGetsTherapistByHisUserIdUseCase

import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";

export default function CompanyGetsTherapistByHisUserIdUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["getTherapistByUserId"]  {
    
    return async (user_id:number) => {
        //checks all company's therapist.
        // sees if the param user_id matches any of them
        return await Repository.getTherapistByUserId(user_id)
    }
}

//TODO: INCOMPLETO