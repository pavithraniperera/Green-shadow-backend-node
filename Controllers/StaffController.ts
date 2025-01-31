import {StaffRepository} from "../repositories/StaffRepository";
import { Request, Response } from 'express';

const staffRepository = new StaffRepository()
export class StaffController{
    async createStaff(req: Request, res: Response) {
        try {
            const { firstName, lastName, gender, designation, email, dob, address, contact, joinDate, role, fieldIds } = req.body;

            if (!firstName || !lastName || !email || !designation || !role) {
               res.status(400).json({ message: "Missing required fields" });
            }

            const staffData = { firstName, lastName, gender, designation, email, dob, address, contact, joinDate, role };

            const newStaff = await staffRepository.createStaff(staffData, fieldIds || []);

            res.status(201).json(newStaff);
        } catch (error) {
            console.error("Error creating staff:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAllStaff(req: Request, res: Response) {
        try {
            const crops = await staffRepository.getAllStaff();
            res.status(200).json(crops);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Staff', error });
        }
    }

    async getStaffById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const crop = await staffRepository.getStaffById(id);
            if (!crop) {
                res.status(404).json({ message: 'Staff not found' });
            } else {
                res.status(200).json(crop);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Staff', error });
        }
    }

    async updateStaff(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { firstName, lastName, gender, designation, email, dob, address, contact, joinDate, role, fieldIds } = req.body;

            if (!firstName || !lastName || !email || !designation || !role) {
                res.status(400).json({ message: "Missing required fields" });
            }

            const updatedStaffData = { firstName, lastName, gender, designation, email, dob, address, contact, joinDate, role };

            const updatedStaff = await staffRepository.updateStaff(id, updatedStaffData,fieldIds);
            res.status(200).json(updatedStaff);
        } catch (error) {
            res.status(500).json({ message: 'Error updating Staff', error });
        }
    }

    async deleteStaff(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await staffRepository.deleteStaff(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Staff', error });
        }
    }

}