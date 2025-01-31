
import express from "express";
import {VehicleController} from "../Controllers/VehicleController";

const router = express.Router();
const vehicleController = new VehicleController();

// Define routes
router.post('/add', vehicleController.createVehicle.bind(vehicleController));
router.put('/update/:id', vehicleController.updateVehicle.bind(vehicleController));  // Update crop
router.get('/:id', vehicleController.getVehicleById.bind(vehicleController));  // Get a single crop
router.get('/staff/:id', vehicleController.getVehicleByStaffId.bind(vehicleController));  // Get a single crop
router.get('/', vehicleController.getAllVehicle.bind(vehicleController));  // Get all crops
router.delete('/delete/:id', vehicleController.deleteVehicle.bind(vehicleController));  // Delete crop

export default router;