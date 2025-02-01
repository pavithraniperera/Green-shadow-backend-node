import express from "express";
import {StaffController} from "../Controllers/StaffController";
import UserController from "../Controllers/UserController";

const router = express.Router();
const userController = new UserController();

// Define routes
router.post('/add', userController.createUser.bind(userController));
router.put('/update/:id', userController.updateUser.bind(userController));  // Update crop
router.get('/:id', userController.getUserById.bind(userController));  // Get a single crop
router.get('/', userController.getAllUsers.bind(userController));  // Get all crops
router.delete('/delete/:id', userController.deleteUser.bind(userController));  // Delete cr

export default router