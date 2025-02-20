import { createUser } from "../models/userModel.js";

export const registerUser = async (req, res) => {
    try {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username ve Password zorunludur!" });
        }

        await createUser(username, password);

        res.status(201).json({ message: "Kullanıcı başarıyla kayıt edildi!" });
    } catch (err) {
        console.error("Something bad happened:", err);
        res.status(500).json({ error: "Sunucu hatası" });
    }
};
