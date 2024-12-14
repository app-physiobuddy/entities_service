import { CompanyUseCasesInterface } from "../aplication/use-cases/company-use-cases";

export interface DbGatewayContract {
    companyRepository: CompanyRepositoryInterface;

  }

  export interface CompanyRepositoryInterface {
    createCompany: CompanyUseCasesInterface["createCompany"];
    getAllCompanies: CompanyUseCasesInterface["getAllCompanies"];
    getCompanyByUserId: CompanyUseCasesInterface["getCompanyByUserId"];
    updateCompany: CompanyUseCasesInterface["updateCompany"]
    deleteCompany: CompanyUseCasesInterface["deleteCompany"]
    createTherapist: CompanyUseCasesInterface["createTherapist"]
    createPatient: CompanyUseCasesInterface["createPatient"]
    getTherapistByUserId: CompanyUseCasesInterface["getTherapistByUserId"]
    getPatientsByTherapistId: CompanyUseCasesInterface["getPatientsByTherapistId"]
    getPatientByPatientId: CompanyUseCasesInterface["getPatientByPatientId"]
    getPatientsByPatientUserId: CompanyUseCasesInterface["getPatientsByPatientUserId"]
    getPatientByUserIdnPatientId: CompanyUseCasesInterface["getPatientByPatientId"]
    getCompanyUserIdByCompanyId:(company_id: number) => Promise<number | null>
  }