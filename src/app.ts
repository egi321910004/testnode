import express, { Application } from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Connect to MongoDB
connectDB();

export default app;
