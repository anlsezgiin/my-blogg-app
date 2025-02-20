import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/authRoutes.js"; // Auth rotalarını içe aktarıyoruz
import connectDB from "./src/database/postgre.js"; // DB bağlantısını dahil et

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// database connection
connectDB();

// routes
app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend Çalışıyor! 🚀");
});

// Server Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
