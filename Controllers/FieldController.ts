import {FieldRepository} from "../repositories/FieldRepository";
import { Request, Response } from 'express';
import multer from "multer";
import Field from "../model/Field";

const fieldRepository = new FieldRepository();


export class FieldController {


    async createField(req: Request, res: Response) {
        try {
            const { name, location, size } = req.body;
            const files = req.files as Express.Multer.File[]
            const image1 =  files[0].path ;
            const image2 =  files[1].path ;

            const newField = await fieldRepository.createField({
                name,
                location,
                size : Number(size),
                image1,
                image2,
            });



            res.status(201).json(newField);
        } catch (error) {

            res.status(500).json({ message: "Error creating field", error });
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
            const { name, location, size } = req.body;
            const files = req.files as Express.Multer.File[]; // Get uploaded files

            // Fetch existing field data from the database
            const existingField = await fieldRepository.getFieldById(id);
            if (!existingField) {
                 res.status(404).json({ message: "Field not found" });
            }

            // Preserve old images if no new ones are uploaded
            const image1 = files[0] ? files[0].path : (existingField as Field).image1;
            const image2 = files[1] ? files[1].path : (existingField as Field).image2;

            // Convert size to number
            const updatedField = await fieldRepository.updateField(id, {
                name,
                location,
                size: Number(size),
                image1,
                image2,
            });

            res.status(200).json(updatedField);
        } catch (error) {
            res.status(500).json({ message: "Error updating field", error });
        }
    }

    async deleteField(req: Request, res: Response) {
        try {
            const { id } = req.params;
           const deletedField =  await fieldRepository.deleteField(id);
            res.status(204).send(deletedField);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting field', error });
        }
    }
}