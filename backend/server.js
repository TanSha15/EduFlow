import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import { submitContactForm } from './controllers/contactController.js';


const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.get("/", (req, res) => {
  res.send("EduFlow Server is up and running!");
});

app.use("/api/auth",authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);
app.post("/api/contact", submitContactForm);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});