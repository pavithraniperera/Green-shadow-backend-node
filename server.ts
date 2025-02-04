import express from 'express';
import fieldRoutes from './routes/FieldRoute';
import cropRoutes from './routes/CropRoute';
import staffRoute from "./routes/StaffRoute";
import vehicleRoute from "./routes/VehicleRoute";
import equipmentRoute from "./routes/EquipmentRoute";
import userRoute from "./routes/UserRoute";
import logRoute from "./routes/LogRoute";
import authRoute from "./routes/AuthRoute";
import {authenticateToken} from "./util/AuthMiddleware";
const app = express();

app.use(express.json()); // Middleware for parsing JSON bodies

app.use('/fields',authenticateToken, fieldRoutes); // Base route for field-related endpoints
app.use('/crops', cropRoutes); // Base route for crop-related endpoints
app.use('/staff', staffRoute); // Base route for staff-related endpoints
app.use('/vehicle', vehicleRoute); // Base route for vehicle-related endpoints
app.use('/equipment', equipmentRoute); // Base route for equipment-related endpoints
app.use('/user', userRoute); // Base route for user-related endpoints
app.use('/log', logRoute); // Base route for log-related endpoints
app.use('/auth', authRoute); // Base route for Auth-related endpoints

app.listen(3000,(error=>{
    console.log("Server started port 3000");
}));