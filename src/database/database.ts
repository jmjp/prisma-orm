import { PrismaClient } from '@prisma/client'
import { loggerDB } from '../middlewares/DatabaseLogger';

const prismaClient = new PrismaClient();

prismaClient.$use(loggerDB)

export { prismaClient };