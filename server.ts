import express from 'express';
import fieldRoutes from './routes/FieldRoute';
import cropRoutes from './routes/CropRoute';
import staffRoute from "./routes/StaffRoute";
import vehicleRoute from "./routes/VehicleRoute";
import equipmentRoute from "./routes/EquipmentRoute";
import userRoute from "./routes/UserRoute";
import logRoute from "./routes/LogRoute";
import authRoute from "./routes/AuthRoute";
import cors from "cors";
const app = express();

app.use(express.json({ limit: "50mb" })); // Increase JSON payload size
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Increase URL-encoded payload size
import fs from 'fs';
import path from 'path';





app.use(
    cors({
        origin: " http://localhost:5173", // Replace with your frontend URL
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true, // Enable cookies if using with frontend authentication
    })
);
// app.use('/',(req,res,next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');
//
//     next();
// })


app.use('/fields', fieldRoutes); // Base route for field-related endpoints
app.use('/crops', cropRoutes); // Base route for crop-related endpoints
app.use('/staff', staffRoute); // Base route for staff-related endpoints
app.use('/vehicle', vehicleRoute); // Base route for vehicle-related endpoints
app.use('/equipment', equipmentRoute); // Base route for equipment-related endpoints
app.use('/user', userRoute); // Base route for user-related endpoints
app.use('/log', logRoute); // Base route for log-related endpoints
app.use('/auth', authRoute); // Base route for Auth-related endpoints
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000,(error=>{
    console.log("Server started port 3000");
}));