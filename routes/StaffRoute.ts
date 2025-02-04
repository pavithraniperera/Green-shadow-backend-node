import express from "express";

import {StaffController} from "../Controllers/StaffController";
import {authenticateToken} from "../util/AuthMiddleware";

const router = express.Router();
const staffController = new StaffController();

// Define routes
router.post('/add', staffController.createStaff.bind(staffController));
router.put('/update/:id',authenticateToken, staffController.updateStaff.bind(staffController));  // Update staff
router.get('/:id',authenticateToken, staffController.getStaffById.bind(staffController));  // Get a single staff
router.get('/',authenticateToken, staffController.getAllStaff.bind(staffController));  // Get all staff
router.delete('/delete/:id',authenticateToken, staffController.deleteStaff.bind(staffController));  // Delete staff

export default router;