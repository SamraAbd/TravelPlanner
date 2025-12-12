import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import citiesRoutes from "./Routes/cities.js";
import {swaggerSpec} from "./swagger/swagger.js";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/users.js";
import planRoutes from "./Routes/planRoutes.js"
import swaggerUi from "swagger-ui-express";

dotenv.config();
connectDB();

const swaggerUiSetup = swaggerUi.setup(swaggerSpec, {
    // Bu seçimlər Authorize düyməsinin görünməsinə kömək edir
    swaggerOptions: {
        // Təhlükəsizlik sxeminin avtomatik dəyərləndirilməsini aktiv edir
        supportedSubmitMethods: ['get', 'post', 'put', 'delete'], 
        
        // Autorizasiya sahəsini avtomatik açmağa kömək edir (opsional)
        persistAuthorization: true 
    },
    explorer: true // Axtarış çubuğunu aktivləşdirir (opsional)
});

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running! I am happy!");
});

app.use("/cities", citiesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUiSetup);


if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app
