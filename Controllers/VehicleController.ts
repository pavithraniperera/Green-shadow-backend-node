
import {Request, Response} from "express";
import {Prisma} from "@prisma/client";
import {VehicleRepository} from "../repositories/VehicleRepository";


const vehicleRepository = new VehicleRepository();

export class VehicleController {
    async createVehicle(req: Request, res: Response) {
        console.log(req.body);
        try {
            const { plateNumber, category, fuelType, status, remarks, staffId } = req.body;

            // Ensure the types match Prisma.VehicleCreateInput
            const vehicleData: Prisma.VehicleCreateInput = {
                plateNumber: String(plateNumber),
                category: String(category),
                fuelType: String(fuelType),
                status: String(status),
                remarks: String(remarks),
                ...(staffId && { Staff: { connect: { staffId: String(staffId) } } })
            };

            const newVehicle = await vehicleRepository.createVehicle(vehicleData);

            res.status(201).json(newVehicle);
        } catch (error) {
            res.status(500).json({ message: "Error creating vehicle", error });
        }
    }


    async getAllVehicle(req: Request, res: Response) {
        try {
            const vehicle = await vehicleRepository.getAllVehicle();
            res.status(200).json(vehicle);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Vehicles', error });
        }
    }

    async getVehicleById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const vehicle = await vehicleRepository.getVehicleById(id);
            if (!vehicle) {
                res.status(404).json({ message: 'Vehicle not found' });
            } else {
                res.status(200).json(vehicle);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Vehicle', error });
        }
    }
    async getVehicleByStaffId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const vehicle = await vehicleRepository.getVehiclesByStaffId(id);
            if (!vehicle) {
                res.status(404).json({ message: 'Vehicle not found' });
            } else {
                res.status(200).json(vehicle);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Vehicle', error });
        }
    }

    async updateVehicle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updateVehicle = await vehicleRepository.updateVehicle(id, updates);
            res.status(200).json(updateVehicle);
        } catch (error) {
            res.status(500).json({ message: 'Error updating Vehicle', error });
        }
    }

    async deleteVehicle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await vehicleRepository.deleteVehicle(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Vehicle', error });
        }
    }
}