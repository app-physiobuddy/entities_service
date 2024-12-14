import { DbGatewayContract } from "../../../adapters/DbGatewayContract.type";
import { Company, Pacient, Physiotherapist } from "../../entities/Entities";
import CreateCompanyUseCase from "./CreateCompanyUseCase.js";
import GetAllCompaniesUseCase from "./GetAllCompaniesUseCase.js";
import GetCompanyByUserIdUseCase from "./GetCompanyByUserIdUseCase.js";
import UpdateCompanyUseCase from "./UpdateCompanyUseCase.js";
import DeleteCompanyUseCase from "./DeleteCompanyUseCase.js";


//TODO: implement on their own use case class
import AddTherapistUseCase from "./addTherapistUseCase.js";
import TherapistsAddsPatientUseCase from "./therapistsAddsPatientUseCase.js";
import GetTherapistByUserIdUseCase from "./getTherapistByUserIdUseCase.js";
import GetPatientsByTherapistUserIdUseCase from "./getPatientsByTherapistUserIdUseCase.js";
import GetPatientByPatientIdUseCase from "./getPatientByPatientIdUseCase.js";
import GetAllPatientsByPatientUserIdUseCase from "./getAllPatientsByPatientUserIdUseCase.js";
import PatientGetsPatientByPatientIdUseCase from "./patientGetsPatientByPatientIdUseCase.js";
import TherapistGetsCompanyUserIdUseCase from "./therapistGetsCompanyUserIdUseCase.js";
import MqttProvider from "../../../framework/providers/MqttProvider";
import mqtt from "mqtt/*";

export interface CompanyUseCasesInterface {
    createCompany: (company: Company) => Promise<boolean| undefined>;
    getAllCompanies: () => Promise<Company[] | null>
    getCompanyByUserId: (user_id: number) => Promise<Company | null>
    updateCompany: (company: Company) => Promise<boolean| undefined>;
    deleteCompany: (user_id: number) => Promise<boolean| undefined>
    createTherapist: (therapist: Physiotherapist) => Promise<boolean| undefined>
    createPatient: (patient: Pacient) => Promise<boolean| undefined>
    getTherapistByUserId: (user_id: number) => Promise<Physiotherapist | null>
    getPatientsByTherapistId: (therapist_id: number) => Promise<Pacient[] | null>
    getPatientByPatientId: (user_id:number, patiend_id:number) => Promise<Pacient | null>
    getPatientsByPatientUserId: (user_id:number) => Promise<Pacient[] | null>
    patientGetsPatientByPatientId: (user_id:number, patiend_id:number) => Promise<Pacient | null>
    therapistGetsCompanyUserId: (user_id:number, company_id: number) => Promise<number | null>

  }


class CompanyUseCases implements CompanyUseCasesInterface {
    private createCompany_use_case: CompanyUseCasesInterface["createCompany"];
    private getAllCompanies_use_case: CompanyUseCasesInterface["getAllCompanies"];
    private getCompanyByUserId_use_case: CompanyUseCasesInterface["getCompanyByUserId"];
    private updateCompany_use_case: CompanyUseCasesInterface["updateCompany"]
    private deleteCompany_use_case: CompanyUseCasesInterface["deleteCompany"]
    private addTherapist_use_case: CompanyUseCasesInterface["createTherapist"]
    private addPatient_use_case: CompanyUseCasesInterface["createPatient"]
    private getTherapistByUserId_use_case: CompanyUseCasesInterface["getTherapistByUserId"]
    private getPatientsByTherapistId_use_case: CompanyUseCasesInterface["getPatientsByTherapistId"]
    private getPatientByPatientId_use_case: CompanyUseCasesInterface["getPatientByPatientId"]
    private getPatientsByPatientUserId_use_case: CompanyUseCasesInterface["getPatientsByPatientUserId"]
    private patientGetsPatientByPatientId_use_case: CompanyUseCasesInterface["getPatientByPatientId"]
    private therapistGetsCompanyUserId_use_case: CompanyUseCasesInterface["therapistGetsCompanyUserId"]

    constructor(
        Repository: DbGatewayContract["companyRepository"],
        Mqtt: InstanceType<typeof MqttProvider>
    ){
        this.createCompany_use_case = CreateCompanyUseCase(Repository);
        this.getAllCompanies_use_case = GetAllCompaniesUseCase(Repository);
        this.getCompanyByUserId_use_case = GetCompanyByUserIdUseCase(Repository);
        this.updateCompany_use_case = UpdateCompanyUseCase(Repository)
        this.deleteCompany_use_case = DeleteCompanyUseCase(Repository)
        this.addTherapist_use_case = AddTherapistUseCase(Repository, Mqtt)
        this.addPatient_use_case = TherapistsAddsPatientUseCase(Repository, Mqtt)
        this.getTherapistByUserId_use_case = GetTherapistByUserIdUseCase(Repository)
        this.getPatientsByTherapistId_use_case = GetPatientsByTherapistUserIdUseCase(Repository)
        this.getPatientByPatientId_use_case = GetPatientByPatientIdUseCase(Repository)
        this.getPatientsByPatientUserId_use_case = GetAllPatientsByPatientUserIdUseCase(Repository)
        this.patientGetsPatientByPatientId_use_case = PatientGetsPatientByPatientIdUseCase(Repository)
        this.therapistGetsCompanyUserId_use_case = TherapistGetsCompanyUserIdUseCase(Repository)

    }
    async createCompany(data: Company) {
        return await this.createCompany_use_case(data);
    }
    async getAllCompanies() {
        return await this.getAllCompanies_use_case();
    }
    async getCompanyByUserId(user_id: number) {
        return await this.getCompanyByUserId_use_case(user_id);
    }
    async updateCompany(data: Company) {
        return await this.updateCompany_use_case(data);
    }
    async deleteCompany(user_id: number) {
        return await this.deleteCompany_use_case(user_id);
    }
    async createTherapist(therapist: Physiotherapist) {
        return await this.addTherapist_use_case( therapist);
    }
    async createPatient(patient: Pacient) {
        return await this.addPatient_use_case(patient);
    }
    async getTherapistByUserId(user_id: number) {
        return await this.getTherapistByUserId_use_case(user_id);
    }
    async getPatientsByTherapistId(therapist_id: number) {
        return await this.getPatientsByTherapistId_use_case(therapist_id);
    }
    async getPatientByPatientId(user_id:number, patiend_id:number) {
        return await this.getPatientByPatientId_use_case(user_id, patiend_id);
    }
    async getPatientsByPatientUserId(user_id:number) {
        return await this.getPatientsByPatientUserId_use_case(user_id);
    }
    async patientGetsPatientByPatientId(user_id:number, patiend_id:number) {
        return await this.patientGetsPatientByPatientId_use_case(user_id, patiend_id);
    }
    async therapistGetsCompanyUserId(user_id: number, company_id: number) {
        return await this.therapistGetsCompanyUserId_use_case(user_id, company_id);
    }
}

export default CompanyUseCases