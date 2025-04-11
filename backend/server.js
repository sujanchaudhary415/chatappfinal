import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import userRouter from './routes/user.route.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import messageRouter from './routes/message.route.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))

app.use('/api/auth',userRouter);
app.use('/api/messages',messageRouter);

app.listen(3000, () => {
  console.log("Server is running on port", 3000);
  connectDb();
});
