import { createUser } from "../models/userModel.js";
import { loginProcess } from "../models/userModel.js";

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

export const loginUser = async (req,res) => {
    try
    {
        let {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username ve Password zorunludur!" });
        }
        const result = await loginProcess(username,password);
        if(result.rows.length>0)
        {
            res.status(200).json({message: "Giriş Başarılı!"});
        }
        else
        {
            res.status(401).json({message: "Kullanıcı adı veya şifre hatalı!"});
        }
    }
    catch(err)
    {
        console.error("Something bad happened:",err);
        res.status(500).json({error: "Sunucu hatası"});
    }
}