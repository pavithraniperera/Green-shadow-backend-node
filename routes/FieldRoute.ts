import {FieldController} from "../Controllers/FieldController";
import {Router} from "express";

const router = Router();
const fieldController = new FieldController();
router.get('/', fieldController.getAllFields.bind(fieldController)); // Get all fields
router.get('/:id', fieldController.getFieldById.bind(fieldController)); // Get field by ID
router.post('/add', fieldController.createField.bind(fieldController)); // Create a new field
router.put('/update/:id', fieldController.updateField.bind(fieldController)); // Update field by ID
router.delete('/delete/:id', fieldController.deleteField.bind(fieldController)); // Delete field by ID



export default router;