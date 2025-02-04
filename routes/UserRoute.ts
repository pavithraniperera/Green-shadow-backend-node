import express from "express";
import {StaffController} from "../Controllers/StaffController";
import UserController from "../Controllers/UserController";
import {authenticateToken} from "../util/AuthMiddleware";

const router = express.Router();
const userController = new UserController();

// Define routes
router.post('/add', userController.createUser.bind(userController));
router.put('/update/:id',authenticateToken, userController.updateUser.bind(userController));  // Update crop
router.get('/:id', userController.getUserById.bind(userController));  // Get a single crop
router.get('/',authenticateToken, userController.getAllUsers.bind(userController));  // Get all crops
router.delete('/delete/:id',authenticateToken, userController.deleteUser.bind(userController));  // Delete cr

export default router