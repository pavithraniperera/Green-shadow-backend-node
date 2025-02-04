import {CropController} from "../Controllers/CropController";
import express from "express";
import {authenticateToken} from "../util/AuthMiddleware";

const router = express.Router();
const cropController = new CropController();

// Define routes
router.post('/add',authenticateToken, cropController.createCrop.bind(cropController));
router.put('/update/:id',authenticateToken, cropController.updateCrop.bind(cropController));  // Update crop
router.get('/:id',authenticateToken, cropController.getCropById.bind(cropController));  // Get a single crop
router.get('/',authenticateToken, cropController.getAllCrops.bind(cropController));  // Get all crops
router.delete('/delete/:id', authenticateToken,cropController.deleteCrop.bind(cropController));  // Delete crop

export default router;