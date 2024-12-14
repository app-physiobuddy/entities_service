import {  PrismaClient } from "@prisma/client";
import ErrorTypes from "../../../../utils/errors/ErrorTypes.js";
import { Company, Pacient, Physiotherapist } from "../../../../aplication/entities/Entities.js";
import { CompanyRepositoryInterface } from "../../../../adapters/DbGatewayContract.type.js";


class CompanyRepository implements CompanyRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createCompany(data:Company) {
    try {
        //@ts-ignore
      const result = await this.prisma.company.create({ data })
      if (!result) throw ErrorTypes.DatabaseError('Error creating company')
      return true
      
    } catch (error:any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
        console.error('Error: Entry with this name already exists.');
        throw ErrorTypes.DatabaseError('Name already exists')
      }
        throw ErrorTypes.DatabaseError('Error creating')
    }
  }

  async getAllCompanies(): Promise<Company[]> {
    try {
      const result = await this.prisma.company.findMany({
      });
      if (!result) throw ErrorTypes.DatabaseError('Error fetching companies');
      return result;
    } catch (error) {
      throw ErrorTypes.DatabaseError('Error fetching companies');
    }
  }

  async getCompanyByUserId(user_id:number): Promise<Company | null> {
    
    try {
      const result = await this.prisma.company.findUnique({
        where: { user_id: user_id },
      })
      console.warn(result)
      if (!result) throw ErrorTypes.DatabaseError('Error getting company. It may not exist')
      return result
    } catch (error) {
        throw ErrorTypes.DatabaseError('Error getting company. It may not exist')
    }
  }

  async updateCompany(
    data: Company
  ) {
    const {user_id, ...rest} = data
    try {
      const result = await this.prisma.company.update({
        where: { user_id: user_id },
        data: rest
      })
      if (!result) throw ErrorTypes.DatabaseError('Error updating category')
      return true
    } catch (error) {
      throw ErrorTypes.DatabaseError('Error updating category.')
    }
  }


  async deleteCompany(user_id: number) {
    try {
      const result = await this.prisma.company.update({
        where: { user_id: user_id },
        data: { 
          is_deleted: true, 
          date_deleted: new Date() 
        }
        
      })
      if (!result) throw ErrorTypes.DatabaseError('Error deleting category')
      return true
    } catch (error) {
      throw ErrorTypes.DatabaseError('Error deleting category');
    }
  }

  async createTherapist(data:Physiotherapist) {
    try {
        //@ts-ignore
      const result = await this.prisma.physiotherapist.create({ data })
      if (!result) throw ErrorTypes.DatabaseError('Error creating Physiotherapist')
      return true
      
    } catch (error:any) {
        throw ErrorTypes.DatabaseError('Error creating Physiotherapist')
    }
  }
  async createPatient(data:Pacient) {
    try {
        //@ts-ignore
      const result = await this.prisma.pacient.create({ data })
      if (!result) throw ErrorTypes.DatabaseError('Error creating Patient')
      return true
      
    } catch (error:any) {
        throw ErrorTypes.DatabaseError('Error creating Patient')
    }
  }

  async getTherapistByUserId(user_id:number): Promise<Physiotherapist | null> {
    
    try {
      const result = await this.prisma.physiotherapist.findUnique({
        where: { user_id: user_id },
      })
      console.warn(result)
      if (!result) throw ErrorTypes.DatabaseError('Error getting therapist. It may not exist')
      return result
    } catch (error) {
        throw ErrorTypes.DatabaseError('Error getting therapist. It may not exist')
    }
  }
  async getPatientsByTherapistId(user_id:number): Promise<Pacient[] | null> {
    
    try {
      const result = await this.prisma.pacient.findMany({
        where: { id_physio: user_id },
      })
      console.warn(result)
      if (!result) throw ErrorTypes.DatabaseError('Error getting patients. It may not exist')
      return result
    } catch (error) {
        throw ErrorTypes.DatabaseError('Error getting patients. It may not exist')
    }
  }
  async getPatientByPatientId(patient_id:number): Promise<Pacient | null> {
    
    try {
      const result = await this.prisma.pacient.findUnique({
        where: { id_pacient: patient_id },
      })
      console.warn(result)
      if (!result) throw ErrorTypes.DatabaseError('Error getting patient. It may not exist')
      return result
    } catch (error) {
        throw ErrorTypes.DatabaseError('Error getting patient. It may not exist')
    }
  }
  async getPatientsByPatientUserId(user_id:number): Promise<Pacient[] | null> {
    
    try {
      const result = await this.prisma.pacient.findMany({
        where: { user_id: user_id },
      })
      console.warn(result)
      if (!result) throw ErrorTypes.DatabaseError('Error getting patients profiles. It may not exist')
      return result
    } catch (error) {
        throw ErrorTypes.DatabaseError('Error getting patients profiles. It may not exist')
    }
  }

  async getPatientByUserIdnPatientId(user_id:number,patient_id:number): Promise<Pacient | null> {
    
    try {
      const result = await this.prisma.pacient.findUnique({
        where: { id_pacient: patient_id, user_id: user_id },
      })
      console.warn(result)
      if (!result) throw ErrorTypes.DatabaseError('Error getting patient. It may not exist')
      return result
    } catch (error) {
        throw ErrorTypes.DatabaseError('Error getting patient. It may not exist')
    }
  }
  async getCompanyUserIdByCompanyId(company_id:number): Promise<number | null> {
    
    try {
      const result = await this.prisma.company.findUnique({
        where: { comp_id: company_id },
      })
      console.warn(result)
      if (!result) throw ErrorTypes.DatabaseError('Error getting company. It may not exist')
      return result.user_id
    } catch (error) {
        throw ErrorTypes.DatabaseError('Error getting company. It may not exist')
    }
  }

 }

export default CompanyRepository