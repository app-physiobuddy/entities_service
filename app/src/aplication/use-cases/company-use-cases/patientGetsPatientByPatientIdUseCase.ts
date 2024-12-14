//patientGetsPatientByPatientIdUseCase


import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";
import ErrorTypes from "../../../utils/errors/ErrorTypes.js";
import { Pacient } from "../../entities/Entities";


export default function PatientGetsPatientByPatientIdUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["patientGetsPatientByPatientId"] {
    
    return async (user_id:number, patient_id:number) => {
        return await Repository.getPatientByUserIdnPatientId(user_id, patient_id)
    }
}
