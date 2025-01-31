
import { Request, Response } from 'express';
import {CropRepository} from "../repositories/CropRepository";
import {Prisma} from "@prisma/client";


const cropRepository = new CropRepository();

export class CropController {
    async createCrop(req: Request, res: Response) {
        console.log(req.body)
        try {
            const { commonName, specificName, category, season, image1, fieldId } = req.body;

            // Ensure the types match Prisma.CropCreateInput
            const cropData: Prisma.CropCreateInput = {
                commonName: String(commonName),
                specificName: String(specificName),
                category: String(category),
                season: String(season),
                image1: String(image1),
                Field: { connect: { fieldId: String(fieldId) } }, // Connect relationship for fieldId
            };

            const newCrop = await cropRepository.createCrop(cropData);

            res.status(201).json(newCrop);
        } catch (error) {
            res.status(500).json({ message: 'Error creating crop', error });
        }
    }


    async getAllCrops(req: Request, res: Response) {
        try {
            const crops = await cropRepository.getAllCrops();
            res.status(200).json(crops);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Crops', error });
        }
    }

    async getCropById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const crop = await cropRepository.getCropById(id);
            if (!crop) {
                res.status(404).json({ message: 'Crop not found' });
            } else {
                res.status(200).json(crop);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Crop', error });
        }
    }

    async updateCrop(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedCrop = await cropRepository.updateCrop(id, updates);
            res.status(200).json(updatedCrop);
        } catch (error) {
            res.status(500).json({ message: 'Error updating Crop', error });
        }
    }

    async deleteCrop(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await cropRepository.deleteCrop(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Crop', error });
        }
    }
}