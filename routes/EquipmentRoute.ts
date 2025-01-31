
import express from "express";

import {EquipmentController} from "../Controllers/EquipmentController";

const router = express.Router();
const equipmentController = new EquipmentController();

// Define routes
router.post('/add', equipmentController.createEquipment.bind(equipmentController));
router.put('/update/:id', equipmentController.updateEquipment.bind(equipmentController));
router.get('/:id', equipmentController.getEquipmentById.bind(equipmentController));
router.get('/staff/:id', equipmentController.getEquipmentByStaffId.bind(equipmentController));
router.get('/field/:id', equipmentController.getEquipmentByFieldId.bind(equipmentController));
router.get('/', equipmentController.getAllEquipment.bind(equipmentController));
router.delete('/delete/:id', equipmentController.deleteEquipment.bind(equipmentController));

export default router;