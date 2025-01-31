import {Vehicle, Prisma, PrismaClient, Equipment} from "@prisma/client";


const prisma = new PrismaClient();

export class EquipmentRepository{
    async createEquipment(data: Prisma.EquipmentCreateInput){

        return   prisma.equipment.create({
            data,
        });


    }

    async getAllEquipment(): Promise<Equipment[]> {
        return prisma.equipment.findMany();
    }


    async getEquipmentById(equipmentId: string) {
        return prisma.equipment.findUnique({
            where: { equipmentId },
        });
    }

    async updateEquipment(equipmentId: string, data: Partial<Equipment>): Promise<Equipment> {
        return prisma.equipment.update({
            where: {equipmentId  },
            data,
        });
    }


    async deleteEquipment(equipmentId: string) {
        return   prisma.equipment.delete({
            where: { equipmentId },
        });
    }


    async getEquipmentByStaffId(staffId: string): Promise<Equipment[]> {
        return prisma.equipment.findMany({
            where: { staffId },
        });
    }
    async getEquipmentByFieldId(fieldId: string): Promise<Equipment[]> {
        return prisma.equipment.findMany({
            where: { fieldId },
        });
    }
}