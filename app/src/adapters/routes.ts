import { Router, Request, Response, NextFunction, Errback } from "express";

export const router = Router();

import PrismaRepository from "../framework/database/prisma/PrismaRepository.js";
import CompanyControllers from "./CompanyControllers.js";
import CompanyUseCases from "../aplication/use-cases/company-use-cases/index.js";
import MqttProvider from "../framework/providers/MqttProvider.js";

const prismaRepository = new PrismaRepository();
const mqttProvider = new MqttProvider();
const companyUseCases = new CompanyUseCases(prismaRepository.companyRepository, mqttProvider);
const companyControllers = new CompanyControllers(companyUseCases);

const asyncHandler = (controller:any) => (req:Request, res:Response, next:NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  }



router.get("/", asyncHandler((req: Request, res: Response) => 
    res.send("Entities Service is running;")
));

router.post("/companies", asyncHandler((req: Request, res: Response) => 
    // Creates a new company
    companyControllers.createCompany(req, res)
));

router.get("/companies", asyncHandler((req: Request, res: Response) => 
    // ADMIN  
    // gets all companies
    companyControllers.getAllCompanies(req, res)
  ));

router.get("/companies/:user_id", asyncHandler((req: Request, res: Response) => 
    // gets data of specific company
    companyControllers.getCompanyByUserId(req, res)
));

router.put("/companies/:user_id", asyncHandler((req: Request, res: Response) => 
    // updates data of specific company
    companyControllers.updateCompany(req, res)
));

router.delete("/companies/:user_id", asyncHandler((req: Request, res: Response) => 
    companyControllers.deleteCompany(req, res)
  ));


//Comapny Therapist Management
router.post("/companies/:user_id/therapist", asyncHandler((req: Request, res: Response) => 
    // Adds therapist to that specific company
    // passes user_id to create new therapist
    companyControllers.addTherapist(req, res)
));

router.get("/companies/:user_id/therapist/", asyncHandler((req: Request, res: Response) => 
    // gets all therapists of that company
res.send("TODO: gets all therapists of this company;")
));

router.get("/therapists/:user_id", asyncHandler((req: Request, res: Response) => 
    // gets specific therapist by its user_id
    companyControllers.getTherapistByUserId(req, res)
));

router.put("/companies/therapists/:user_id", asyncHandler((req: Request, res: Response) => 
    // updates data of specific therapist of that company
    res.send("App is running;")
));

router.delete("/companies/therapists/:user_id", asyncHandler((req: Request, res: Response) => 
    // removes specific therapist of that company
    res.send("App is running;")
));


//Therapist Patient Management
router.post("/therapists/:user_id/patients", asyncHandler((req: Request, res: Response) => 
    // Adds patient to that specific therapist
    // passes user_id to create new patient
    companyControllers.therapistAddsPatient(req, res)
    
));

router.get("/therapists/:user_id/patients", asyncHandler((req: Request, res: Response) => 
    // gets all patitents of that therapist
    companyControllers.getPatientsByTherapistId(req, res)
));

router.get("/therapists/:user_id/patients/:patient_id", asyncHandler((req: Request, res: Response) => 
    // gets info of specific patitent of that therapist
    companyControllers.therapistGetsPatientByPatientId(req, res)
));

router.put("/therapists/:user_id/patients/:patient_id", asyncHandler((req: Request, res: Response) => 
    // updates info of specific patitent of that therapist
    res.send("App is running;")
));

router.get("/patients/:user_id", asyncHandler((req: Request, res: Response) => 
    // patient user gets all his patients profiles
    companyControllers.getAllPatientsByPatientUserId(req, res)
));

router.get("/patients/:user_id/patients/:patient_id", asyncHandler((req: Request, res: Response) => 
    // patient user gets all his patients profiles
    companyControllers.patientGetsPatientByPatientId(req, res)
));

//Helper routes for coordinator B
router.get("/therapists/:user_id/companies/:company_id", asyncHandler((req: Request, res: Response) => 

    companyControllers.therapistGetsCompanyUserId(req, res)
));

router.get("/check/therapists/:user_id/patients/:patient_id", asyncHandler((req: Request, res: Response) => 
    companyControllers.therapistHasPatient(req, res)
));