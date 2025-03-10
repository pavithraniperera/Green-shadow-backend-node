import express from "express";


import {LogController} from "../Controllers/LogController";
import {authenticateToken} from "../util/AuthMiddleware";
import upload from "../util/upload";

const router = express.Router();
const logController = new LogController();

// Define routes
router.post('/add',authenticateToken,upload.single('image'), logController.createLog.bind(logController));
router.put('/update/:id',upload.single('image'),authenticateToken, logController.updateLog.bind(logController));
router.get('/:id',authenticateToken, logController.getLogById.bind(logController));
router.get('/',authenticateToken, logController.getAllLogs.bind(logController));
router.delete('/delete/:id',authenticateToken, logController.deleteLog.bind(logController));

export default router