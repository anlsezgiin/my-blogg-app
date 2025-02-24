import { createBlogInDB, getBlogsByUserId, getBlogById } from "../models/blogModel.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.session.user.id; // Session’daki kullanıcı ID’sini al

        if (!title || !content) {
            return res.status(400).json({ error: "Başlık ve içerik zorunludur!" });
        }

        await createBlogInDB(userId, title, content);
        res.status(201).json({ message: "Blog başarıyla oluşturuldu!" });
    } catch (err) {
        console.error("Hata:", err);
        res.status(500).json({ error: "Sunucu hatası" });
    }
};

export const getUserBlogs = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const blogs = await getBlogsByUserId(userId);
        res.status(200).json(blogs.rows);
    } catch (err) {
        console.error("Hata:", err);
        res.status(500).json({ error: "Sunucu hatası" });
    }
};

export const getSingleBlog = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const blogId = req.params.id;

        const blog = await getBlogById(userId, blogId);
        
        if (!blog.rows.length) {
            return res.status(404).json({ error: "Blog bulunamadı veya yetkisiz erişim!" });
        }

        res.status(200).json(blog.rows[0]);
    } catch (err) {
        console.error("Hata:", err);
        res.status(500).json({ error: "Sunucu hatası" });
    }
};

