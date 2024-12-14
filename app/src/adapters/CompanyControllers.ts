import { CompanyUseCasesInterface } from "../aplication/use-cases/company-use-cases";
import TypeHttp from "../framework/http.type";
import ErrorTypes from "../utils/errors/ErrorTypes.js";
import { DbGatewayContract } from "./DbGatewayContract.type";

//tt
class CompanyControllers<Req extends TypeHttp["Request"], Res extends TypeHttp["Response"]>  {
    private companyUseCases: CompanyUseCasesInterface

    constructor(companyUseCases: CompanyUseCasesInterface) {
        this.companyUseCases = companyUseCases;
    }

    async createCompany(req:Req, res:Res) {
        /*
        user.role
        user.id

        data.name: string;
        data.street: string;
        data.zip_code: string;
        data.city: string;
        data.phone_number: string;
        */
        const prepareCategoryData = req.body.data;
        if (!prepareCategoryData) throw ErrorTypes.UnauthorizedAccess("data is required");
        if (!req.body.user.role || !req.body.user.id || !req.body.user.email) throw ErrorTypes.UnauthorizedAccess("user.role, user.email and user.id is required");
        const user = req.body.user;
        
        const data = {
            name : prepareCategoryData.name,
            street: prepareCategoryData.street,
            zip_code: prepareCategoryData.zip_code,
            city: prepareCategoryData.city,
            phone_number: prepareCategoryData.phone_number,
            email: user.email,
            user_id : user.id,
            date_updated : new Date(),
        }


        const response = await this.companyUseCases.createCompany(data);

        return res.status(201).json({
            success: response,
            message : response ? "Company created" : "Error creating new company"
        });
    }

    async getAllCompanies(req:Req, res:Res) {
        

        const response = await this.companyUseCases.getAllCompanies();

        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting companies"
        });
    }

    async getCompanyByUserId(req:Req, res:Res) {
        /*

        user.id on params
        */

        if(!req.params["user_id"]) throw ErrorTypes.UnauthorizedAccess("user.id is required")
        const user_id = Number(req.params["user_id"])
    


        const response = await this.companyUseCases.getCompanyByUserId(user_id);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error getting category"
        });
    }
    async updateCompany(req:Req, res:Res) {
        /*
        user.id from params
        data (everything that updates + category_id)
        */
        if(!req.params["user_id"]) throw ErrorTypes.UnauthorizedAccess("user.id is required")
        const user_id = Number(req.params["user_id"])
       
        const prepareCategoryData = req.body.data;
        if (!prepareCategoryData) throw ErrorTypes.UnauthorizedAccess("data is required");

        
        const data = {
            name : prepareCategoryData.name,
            street: prepareCategoryData.street,
            zip_code: prepareCategoryData.zip_code,
            city: prepareCategoryData.city,
            phone_number: prepareCategoryData.phone_number,
            user_id : user_id,
            date_updated : new Date(),
        }


        const response = await this.companyUseCases.updateCompany(data);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error updating Company"
        });
    }


    async deleteCompany(req:Req, res:Res) {
        /*
        user.id on params
        */
        if(!req.params["user_id"]) throw ErrorTypes.UnauthorizedAccess("user.id is required")
        const user_id = Number(req.params["user_id"])


        const response = await this.companyUseCases.deleteCompany(user_id);
    
        return res.status(200).json({
            success: Boolean(response),
            message: response ? "Company deleted" : "Error deleting company"
        });
    }

    async addTherapist(req:Req, res:Res) {
        // Creates a new therapist
        /*
        company.id of company
        therapist.id of therapist get from route

        name of therapis
        user_id = user.id of therapist
        company_id = user_id of company
        phone of therapis
        email  = email of therapist
        
        esta route é logada com company e precisa de ir a auth db buscar o id do therapist e passar  o email do therapist
        */
        console.log("add therapis controller called")


        if (!req.params.user_id) throw ErrorTypes.UnauthorizedAccess("company_id is required");
        const auth_user_id = Number(req.params.user_id);

        const company = await this.companyUseCases.getCompanyByUserId(auth_user_id);
        if (!company) throw ErrorTypes.UnauthorizedAccess("user id of company is required");



        const data = {
            user_id: Number(req.body.data.user_id),
            company_id: Number(company.comp_id),
            name: req.body.data.name,
            email: req.body.data.email,
            phone: req.body.data.phone,
            date_updated : new Date(),
        }
        console.log(data)

        const response = await this.companyUseCases.createTherapist(data);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? "Therapist added" : "Error adding therapist"
        });

    }
    async therapistAddsPatient(req:Req, res:Res) {
        // Creates a new patient
        /*
  
        esta route é logada com therapist e precisa de ir a auth db buscar o id do patient passando o email do therapist
        */
        console.log("add therapis controller called")


        if (!req.params.user_id) throw ErrorTypes.UnauthorizedAccess("therapist_id is required");
        const auth_therapist_id = Number(req.params.user_id);

        const therapist = await this.companyUseCases.getTherapistByUserId(auth_therapist_id);
        if (!therapist) throw ErrorTypes.UnauthorizedAccess("No therapist was found");


        
        const data = {
            user_id: Number(req.body.data.id), //from auth
            id_physio: Number(therapist.physio_id),
            name: req.body.data.name,
            email: req.body.data.email,
            phone_numb: req.body.data.phone_numb,
            age: Number(req.body.data.age),
            nif: Number(req.body.data.nif),
            date_updated : new Date(),
        }
        console.log(data)

        const response = await this.companyUseCases.createPatient(data);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? "Patient added" : "Error adding patient"
        });

    }
    async getPatientsByTherapistId(req:Req, res:Res) {
        /*
        therapist_id is auth id from therapist
        */


        if (!req.params.user_id) throw ErrorTypes.UnauthorizedAccess("therapist user_id is required");
        const therapist_id = Number(req.params.user_id);
        

        const response = await this.companyUseCases.getPatientsByTherapistId(therapist_id);

        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error, finding patients"
        });
    }
    async getTherapistByUserId(req:Req, res:Res) {
        /*
        user.id
        */
        if (!req.params.user_id) throw ErrorTypes.UnauthorizedAccess("user_id is required");
        const user_id = Number(req.params.user_id);

        const response = await this.companyUseCases.getTherapistByUserId(user_id);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error, finding therapist"
        });
    }


    async companyGetsTherapistByHisUserId(req:Req, res:Res) {
        /*
        user.id
        */
        if (!req.params.user_id) throw ErrorTypes.UnauthorizedAccess("user_id is required");
        const user_id = Number(req.params.user_id);
        
        //checks all company's therapist.

        const response = await this.companyUseCases.getTherapistByUserId(user_id);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error finding therapist"
        });
    }

    async therapistGetsPatientByPatientId(req:Req, res:Res) {
        /*
        user.id
        */
        if (!req.params.user_id) throw ErrorTypes.UnauthorizedAccess("user_id is required");
        const user_id = Number(req.params.user_id);
        if (!req.params.patient_id) throw ErrorTypes.UnauthorizedAccess("patient_id is required");
        const patient_id = Number(req.params.patient_id);

        const response = await this.companyUseCases.getPatientByPatientId(user_id,patient_id);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error, not finding patient"
        });   
    }

    async getAllPatientsByPatientUserId(req:Req, res:Res) {
        /*
        user.id
        */
        if (!req.params.user_id) throw ErrorTypes.UnauthorizedAccess("user_id is required");
        const user_id = Number(req.params.user_id);
        
        const response = await this.companyUseCases.getPatientsByPatientUserId(user_id);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error, finding patients"
        });
    }
    async patientGetsPatientByPatientId(req:Req, res:Res) {
        /*
        user.id
        */
        if (!req.params.user_id) throw ErrorTypes.UnauthorizedAccess("user_id is required");
        const user_id = Number(req.params.user_id);
        if (!req.params.patient_id) throw ErrorTypes.UnauthorizedAccess("patient_id is required");
        const patient_id = Number(req.params.patient_id);
        
        const response = await this.companyUseCases.patientGetsPatientByPatientId(user_id,patient_id);
        return res.status(200).json({
            success: Boolean(response),
            message: response ? response : "Error, not finding patient"
        });
    }

    async therapistGetsCompanyUserId(req:Req, res:Res) {
        console.log("CONTROLELER therapistGetsCompanyUserId")
        const { user_id, company_id } = req.params
        console.log("CONTROLELER", company_id, user_id )
        if (!user_id) throw ErrorTypes.UnauthorizedAccess("user_id is required");
        if (!company_id) throw ErrorTypes.UnauthorizedAccess("company_id is required");
        try {
            const response = await this.companyUseCases.therapistGetsCompanyUserId(Number(user_id),Number(company_id));
            return res.status(200).json({
                success: Boolean(response),
                message: response ? response : "Error, not finding company"
            });
            
        } catch (error) {
            res.send(error)
        }
    }
    async therapistHasPatient(req:Req, res:Res) {
        const { user_id, patient_id } = req.params
        if (!user_id) throw ErrorTypes.UnauthorizedAccess("user_id is required");
        if (!patient_id) throw ErrorTypes.UnauthorizedAccess("patient_id is required");

        console.log("CONTROLELER", patient_id )
        const response = await this.companyUseCases.getPatientByPatientId(Number(user_id),Number(patient_id));
        return res.status(200).json({
            success: Boolean(response),
            message: response ? "Patient found" : "Error, not finding patient"
        });
    }
}

export default CompanyControllers