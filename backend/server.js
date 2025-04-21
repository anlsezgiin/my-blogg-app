import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import authRoutes from "./src/routes/authRoutes.js"; // Auth rotalarını içe aktarıyoruz
import blogRoutes from "./src/routes/blogRoutes.js";
import connectDB from "./src/database/postgre.js"; // DB bağlantısını dahil et
import passport from "passport";
import "./src/passport/googleStrategy.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));


// database connection
connectDB();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 saat
}));
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use("/", authRoutes);
app.use("/", blogRoutes);


app.get("/", (req, res) => {
    res.send("Backend Çalışıyor! 🚀");
});

// Server Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
