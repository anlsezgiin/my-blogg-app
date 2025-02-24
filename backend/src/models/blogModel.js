import connectDB from "../database/postgre.js";

const db = connectDB();

export const createBlogInDB = async (userId, title, content) => {
    return await db.query("INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3)", [userId, title, content]);
};

export const getBlogsByUserId = async (userId) => {
    return await db.query("SELECT * FROM blogs WHERE user_id = $1", [userId]);
};

export const getBlogById = async (userId, blogId) => {
    return await db.query("SELECT * FROM blogs WHERE user_id = $1 AND id = $2", [userId, blogId]);
};


