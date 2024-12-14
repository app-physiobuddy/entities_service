//getPatientByPatientIdUseCase


import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { CompanyUseCasesInterface } from ".";
import ErrorTypes from "../../../utils/errors/ErrorTypes.js";
import { Pacient } from "../../entities/Entities";

const getPatientById = (patients: Pacient[], patientId: number) => {
    return patients.find(patient => patient.id_pacient === patientId);
  };

export default function GetPatientByPatientIdUseCase (Repository: DbGatewayContract["companyRepository"])
: CompanyUseCasesInterface["getPatientByPatientId"]  {
    
    return async (user_id:number, patient_id:number) => {
        const therapist = await Repository.getTherapistByUserId(user_id)
        if (!therapist) throw ErrorTypes.NotFoundError('Error getting therapist. It may not exist')
        const physio_id = Number(therapist.physio_id)

        const patients = await Repository.getPatientsByTherapistId(physio_id)
        console.log(patients)
        if (!patients) throw ErrorTypes.NotFoundError('Error getting patients. It may not exist')
            
        const result = getPatientById(patients, patient_id)
        console.log(patient_id)
        if (!result) throw ErrorTypes.NotFoundError('Patient not found')
        return result!
    }
}
