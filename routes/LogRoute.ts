import express from "express";


import {LogController} from "../Controllers/LogController";

const router = express.Router();
const logController = new LogController();

// Define routes
router.post('/add', logController.createLog.bind(logController));
router.put('/update/:id', logController.updateLog.bind(logController));
router.get('/:id', logController.getLogById.bind(logController));
router.get('/', logController.getAllLogs.bind(logController));
router.delete('/delete/:id', logController.deleteLog.bind(logController));

export default router