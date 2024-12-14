import { PrismaClient, Prisma } from '@prisma/client'
import { DbGatewayContract } from '../../../adapters/DbGatewayContract.type.js'
import CompanyRepository from './specific-repositories/CompanyRepository.js'



export class PrismaRepository implements DbGatewayContract {
  private prismaClient: PrismaClient;
  companyRepository: DbGatewayContract['companyRepository'];


  constructor() {
    this.prismaClient = new PrismaClient({
      log: ['query', 'info', 'warn', 'error']
    });

  this.companyRepository = new CompanyRepository(this.prismaClient);

  }
}

export default PrismaRepository