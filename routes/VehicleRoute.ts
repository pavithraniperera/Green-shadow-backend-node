
import express from "express";
import {VehicleController} from "../Controllers/VehicleController";
import {authenticateToken} from "../util/AuthMiddleware";

const router = express.Router();
const vehicleController = new VehicleController();

// Define routes
router.post('/add',authenticateToken, vehicleController.createVehicle.bind(vehicleController));
router.put('/update/:id',authenticateToken, vehicleController.updateVehicle.bind(vehicleController));  // Update crop
router.get('/:id',authenticateToken, vehicleController.getVehicleById.bind(vehicleController));  // Get a single crop
router.get('/staff/:id',authenticateToken, vehicleController.getVehicleByStaffId.bind(vehicleController));  // Get a single crop
router.get('/',authenticateToken, vehicleController.getAllVehicle.bind(vehicleController));  // Get all crops
router.delete('/delete/:id',authenticateToken, vehicleController.deleteVehicle.bind(vehicleController));  // Delete crop

export default router;