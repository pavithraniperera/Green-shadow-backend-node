import {CropController} from "../Controllers/CropController";
import express from "express";

const router = express.Router();
const cropController = new CropController();

// Define routes
router.post('/add', cropController.createCrop.bind(cropController));
router.put('/update/:id', cropController.updateCrop.bind(cropController));  // Update crop
router.get('/:id', cropController.getCropById.bind(cropController));  // Get a single crop
router.get('/', cropController.getAllCrops.bind(cropController));  // Get all crops
router.delete('/delete/:id', cropController.deleteCrop.bind(cropController));  // Delete crop

export default router;