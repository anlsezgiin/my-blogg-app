import { createUser, loginProcess } from "../models/authModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username ve Password zorunludur!" });
        }

        // hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, hashedPassword);

        res.status(201).json({ message: "Kullanıcı başarıyla kayıt edildi!" });
    } catch (err) {
        console.error("Something bad happened:", err);
        res.status(401).json({ error: "Kullanıcı adı zaten kullanılıyor!" });
    }
};

export const loginUser = async (req, res) => {
    try {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username ve Password zorunludur!" });
        }
        const result = await loginProcess(username);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Kullanıcı adı veya şifre hatalı!" });
        }
        const hashedPassword = result.rows[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            res.status(200).json({ message: "Giriş Başarılı!" });
        } else {
            res.status(401).json({ error: "Kullanıcı adı veya şifre hatalı!" });
        }
    } catch (err) {
        console.error("Something bad happened:", err);
        res.status(500).json({ error: "Sunucu hatası" });
    }
};
