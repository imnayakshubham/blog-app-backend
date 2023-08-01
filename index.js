import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configureDB/db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const app = express();
connectDB()


app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/", userRoutes);
app.use("/api/", blogRoutes);



app.listen(process.env.PORT, () => console.log("Server is running on port " + process.env.PORT));
