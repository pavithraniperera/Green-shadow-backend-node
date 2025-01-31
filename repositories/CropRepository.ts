import { Crop,Prisma, PrismaClient} from "@prisma/client";
import Field from "../model/Field";


const prisma = new PrismaClient();
export class CropRepository{

    async createCrop(data: Prisma.CropCreateInput){

       return   prisma.crop.create({
          data,
        });


    }

    // Get all crops
    async getAllCrops(): Promise<Crop[]> {
        return prisma.crop.findMany();
    }

    // Get a crop by its ID
    async getCropById(cropId: string) {
        return prisma.crop.findUnique({
            where: { cropId },
        });
    }

    async updateCrop(cropId: string, data: Partial<Crop>): Promise<Crop> {
        return prisma.crop.update({
            where: { cropId },
            data,
        });
    }


    async deleteCrop(cropId: string) {
        return   prisma.crop.delete({
            where: { cropId },
        });
    }

    // Get crops by field ID (if there's a relationship)
    async getCropsByFieldId(fieldId: string): Promise<Crop[]> {
        return prisma.crop.findMany({
            where: { fieldId },
        });
    }



}