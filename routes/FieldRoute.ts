import {FieldController} from "../Controllers/FieldController";
import {Router} from "express";
import {authenticateToken} from "../util/AuthMiddleware";
import upload from "../util/upload";


const router = Router();
const fieldController = new FieldController();
router.post("/add", authenticateToken,upload.array("images", 2), (req, res) =>
    fieldController.createField(req, res)
);

router.put("/update/:id",authenticateToken, upload.array("images", 2), (req, res) =>
    fieldController.updateField(req, res)
);
router.get('/', authenticateToken,fieldController.getAllFields.bind(fieldController)); // Get all fields
router.get('/:id', authenticateToken,fieldController.getFieldById.bind(fieldController)); // Get field by ID
// router.post('/add',authenticateToken, fieldController.createField.bind(fieldController)); // Create a new field
// router.put('/update/:id',authenticateToken, fieldController.updateField.bind(fieldController)); // Update field by ID
router.delete('/delete/:id',authenticateToken, fieldController.deleteField.bind(fieldController)); // Delete field by ID



export default router;