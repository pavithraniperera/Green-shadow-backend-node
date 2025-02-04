
import express from "express";

import {EquipmentController} from "../Controllers/EquipmentController";
import {authenticateToken} from "../util/AuthMiddleware";

const router = express.Router();
const equipmentController = new EquipmentController();

// Define routes
router.post('/add',authenticateToken, equipmentController.createEquipment.bind(equipmentController));
router.put('/update/:id',authenticateToken, equipmentController.updateEquipment.bind(equipmentController));
router.get('/:id',authenticateToken, equipmentController.getEquipmentById.bind(equipmentController));
router.get('/staff/:id',authenticateToken, equipmentController.getEquipmentByStaffId.bind(equipmentController));
router.get('/field/:id',authenticateToken, equipmentController.getEquipmentByFieldId.bind(equipmentController));
router.get('/', authenticateToken,equipmentController.getAllEquipment.bind(equipmentController));
router.delete('/delete/:id',authenticateToken, equipmentController.deleteEquipment.bind(equipmentController));

export default router;