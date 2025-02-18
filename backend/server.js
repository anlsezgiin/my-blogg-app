import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import pg from "pg";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();

// Routes
app.get("/", (req, res) => {
    res.send("Backend Çalışıyor! 🚀");
});

app.post("/register",async (req,res) => {
    try
    {
        console.log(req.body);
        let username = req.body.username;
        let password = req.body.password;
        if (!username || !password) {
            return res.status(400).json({ error: "Username ve Password zorunludur!" });
        }
        await db.query("INSERT INTO users (username,password) VALUES ($1,$2)",[username,password]);
        res.json(200,"Kullanıcı başarıyla kayıt edildi!");
    }
    catch(err)
    {
        console.error("Something bad happend", err);
    }
    
})

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
