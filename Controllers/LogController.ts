
import {Request, Response} from "express";
import {Prisma} from "@prisma/client";
import {LogRepository} from "../repositories/LogRepository";
import Logs from "../model/Logs";


const logRepository = new LogRepository();

export class LogController {
    async createLog(req: Request, res: Response) {

        console.log(req.body);
        try {
            const { logDetails, date, status, staffId, fieldId, cropId } = req.body;
            const file = req.file;
            console.log(req.body)
            if (!file) {
                res.status(400).json({ error: "No file uploaded" });
            }

            const image2 =  file?.path ;

            // Ensure the types match Prisma.VehicleCreateInput
            const logData: Prisma.LogCreateInput = {
                logDetails: String(logDetails),
                date: new Date(date),
                image2: String(image2),
                status: String(status),
                Staff: { connect: { staffId: String(staffId) } } ,
                ...(fieldId && { Field: { connect: { fieldId: String(fieldId) } } }),
                ...(cropId && { Crop: { connect: { cropId: String(cropId) } } })

            };

            const newLog = await logRepository.createLog(logData);

            res.status(201).json(newLog);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error creating Log", error });
        }
    }


    async getAllLogs(req: Request, res: Response) {
        try {
            const logs = await logRepository.getAllLogs();
            res.status(200).json(logs);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Logs', error });
        }
    }

    async getLogById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const log = await logRepository.getLogById(id);
            if (!log) {
                res.status(404).json({ message: 'Log not found' });
            } else {
                res.status(200).json(log);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving Log', error });
        }
    }

    async updateLog(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Fetch the existing log
            const log = await logRepository.getLogById(id);
            if (!log) {
                 res.status(404).json({ message: "Log not found" });
            }

            const { logDetails, date, status, staffId, fieldId, cropId } = req.body;

            // Keep existing image if no new file is uploaded
            let imagePath = (log as Logs).image2;
            if (req.file) {
                imagePath = req.file.path;
            }

            console.log(logDetails, date);

            // Prepare update data
            const updatedLogData = {
                logDetails: String(logDetails),
                date: new Date(date),
                status: String(status),
                image2: imagePath, // Use updated or existing image
                Staff: { connect: { staffId: String(staffId) } } ,
                ...(fieldId && { Field: { connect: { fieldId: String(fieldId) } } }),
                ...(cropId && { Crop: { connect: { cropId: String(cropId) } } })
            };

            // Update log
            const updatedLog = await logRepository.updateLog(id, updatedLogData);
            console.log(updatedLog);

            res.status(200).json(updatedLog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error updating Log", error });
        }
    }


    async deleteLog(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await logRepository.deleteLog(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Log', error });
        }
    }
}