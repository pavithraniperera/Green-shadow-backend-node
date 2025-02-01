import {Vehicle, Prisma, PrismaClient, Log} from "@prisma/client";


const prisma = new PrismaClient();

export class LogRepository{
    async createLog(data: Prisma.LogCreateInput){

        return   prisma.log.create({
            data,
        });


    }


    async getAllLogs(): Promise<Log[]> {
        return prisma.log.findMany();
    }


    async getLogById(logId: string) {
        return prisma.log.findUnique({
            where: { logId },
        });
    }

    async updateLog(logId: string, data: Partial<Log>): Promise<Log> {
        return prisma.log.update({
            where: { logId },
            data,
        });
    }


    async deleteLog(logId: string) {
        return   prisma.log.delete({
            where: { logId },
        });
    }



}