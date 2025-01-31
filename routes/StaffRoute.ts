import express from "express";

import {StaffController} from "../Controllers/StaffController";

const router = express.Router();
const staffController = new StaffController();

// Define routes
router.post('/add', staffController.createStaff.bind(staffController));
router.put('/update/:id', staffController.updateStaff.bind(staffController));  // Update staff
router.get('/:id', staffController.getStaffById.bind(staffController));  // Get a single staff
router.get('/', staffController.getAllStaff.bind(staffController));  // Get all staff
router.delete('/delete/:id', staffController.deleteStaff.bind(staffController));  // Delete staff

export default router;