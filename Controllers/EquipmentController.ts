
import {Request, Response} from "express";
import {Prisma} from "@prisma/client";
import {VehicleRepository} from "../repositories/VehicleRepository";
import {EquipmentRepository} from "../repositories/EquipmentRepository";


const equipmentRepository = new EquipmentRepository();

export class EquipmentController {
    async createEquipment(req: Request, res: Response) {
        console.log(req.body);
        try {
            const { type, name, status, fieldId, staffId, remarks } = req.body;

            // Ensure the types match Prisma.EquipmentCreateInput
            const equipmentData: Prisma.EquipmentCreateInput = {
                type: String(type),
                name: String(name),
                status: String(status),
                remarks: String(remarks),
                ...(fieldId && { Field: { connect: { fieldId: String(fieldId) } } }),
                ...(staffId && { Staff: { connect: { staffId: String(staffId) } } })
            };

            const newEquipment = await equipmentRepository.createEquipment(equipmentData);

            res.status(201).json(newEquipment);
        } catch (error) {
            res.status(500).json({ message: "Error creating equipment", error });
        }
    }



    async getAllEquipment(req: Request, res: Response) {
        try {
            const equipment = await equipmentRepository.getAllEquipment();
            res.status(200).json(equipment);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Equipment', error });
        }
    }

    async getEquipmentById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const equipment = await equipmentRepository.getEquipmentById(id);
            if (!equipment) {
                res.status(404).json({ message: 'Equipment not found' });
            } else {
                res.status(200).json(equipment);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Equipment', error });
        }
    }

    async getEquipmentByStaffId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const equipment = await equipmentRepository.getEquipmentByStaffId(id);
            if (!equipment) {
                res.status(404).json({ message: 'Equipment not found' });
            } else {
                res.status(200).json(equipment);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Equipment', error });
        }
    }
    async getEquipmentByFieldId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const equipment = await equipmentRepository.getEquipmentByFieldId(id);
            if (!equipment) {
                res.status(404).json({ message: 'Equipment not found' });
            } else {
                res.status(200).json(equipment);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Equipment', error });
        }
    }

    async updateEquipment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedEquipment = await equipmentRepository.updateEquipment(id, updates);
            res.status(200).json(updatedEquipment);
        } catch (error) {
            res.status(500).json({ message: 'Error updating Equipment', error });
        }
    }

    async deleteEquipment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await equipmentRepository.deleteEquipment(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Equipment', error });
        }
    }
}