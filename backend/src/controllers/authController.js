import { createUser, loginProcess } from "../models/authModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
try {
        let { username, email, password } = req.body;

        if (!username || !password ||!email) {
            return res.status(400).json({ error: "Username, Email ve Password zorunludur!" });
        }

        // hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username,email, hashedPassword);

        res.status(201).json({ message: "Kullanıcı başarıyla kayıt edildi!" });
    } catch (err) {
        console.error("Something bad happened:", err);
        res.status(401).json({ error: "Kullanıcı adı zaten kullanılıyor!" });
    }
};

export const loginUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        if (!username || !password ||!email) {
            return res.status(400).json({ error: "Username, Email ve Password zorunludur!" });
        }
        const result = await loginProcess(username);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Kullanıcı adı, Email veya şifre hatalı!" });
        }
        const hashedPassword = result.rows[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            // session save
            console.log(result.rows[0]);
            req.session.user = {
                id: result.rows[0].id,
                username: result.rows[0].username,
                email: result.rows[0].email
            };
            res.status(200).json({ message: "Giriş Başarılı!", user: req.session.user });
        } else {
            res.status(401).json({ error: "Kullanıcı adı, Email veya şifre hatalı!" });
        }
    } catch (err) {
        console.error("Something bad happened:", err);
        res.status(500).json({ error: "Sunucu hatası" });
    }
};
