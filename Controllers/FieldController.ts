import {FieldRepository} from "../repositories/FieldRepository";
import { Request, Response } from 'express';

const fieldRepository = new FieldRepository();

export class FieldController {
    async createField(req :Request, res:Response) {
        try {
            const { name, location, size, image1, image2 } = req.body;
            const newField = await fieldRepository.createField({
                name,
                location,
                size,
                image1,
                image2,
            });
            res.status(201).json(newField);
        } catch (error) {
            res.status(500).json({ message: 'Error creating field', error });
        }
    }

    async getAllFields(req: Request, res: Response) {
        try {
            const fields = await fieldRepository.getAllFields();
            res.status(200).json(fields);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving fields', error });
        }
    }

    async getFieldById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const field = await fieldRepository.getFieldById(id);
            if (!field) {
                res.status(404).json({ message: 'Field not found' });
            } else {
                res.status(200).json(field);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving field', error });
        }
    }

    async updateField(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedField = await fieldRepository.updateField(id, updates);
            res.status(200).json(updatedField);
        } catch (error) {
            res.status(500).json({ message: 'Error updating field', error });
        }
    }

    async deleteField(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await fieldRepository.deleteField(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting field', error });
        }
    }
}