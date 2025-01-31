import {Vehicle, Prisma, PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

export class VehicleRepository{
    async createVehicle(data: Prisma.VehicleCreateInput){

        return   prisma.vehicle.create({
            data,
        });


    }


    async getAllVehicle(): Promise<Vehicle[]> {
        return prisma.vehicle.findMany();
    }


    async getVehicleById(vehicleId: string) {
        return prisma.vehicle.findUnique({
            where: { vehicleId },
        });
    }

    async updateVehicle(vehicleId: string, data: Partial<Vehicle>): Promise<Vehicle> {
        return prisma.vehicle.update({
            where: { vehicleId },
            data,
        });
    }


    async deleteVehicle(vehicleId: string) {
        return   prisma.vehicle.delete({
            where: { vehicleId },
        });
    }


    async getVehiclesByStaffId(staffId: string): Promise<Vehicle[]> {
        return prisma.vehicle.findMany({
            where: { staffId },
        });
    }
}