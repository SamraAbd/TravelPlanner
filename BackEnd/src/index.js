import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import citiesRoutes from "./Routes/cities.js";
import { swaggerSpec, swaggerUiSetup, swaggerUiDocs } from "./swagger/swagger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/cities", citiesRoutes);
app.use("/api-docs", swaggerUiSetup, swaggerUiDocs);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app
