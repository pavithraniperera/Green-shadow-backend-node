import express from "express";
import {AuthController} from "../Controllers/AuthController";
import {authenticateToken} from "../util/AuthMiddleware";

const router = express.Router();
const authController = new AuthController();

// Define routes
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
//router.post('/refresh', authController.refreshAccessToken.bind(authController));



export default router