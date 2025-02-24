import connectDB from "../database/postgre.js";

const db = connectDB();

export const createBlogInDB = async (userId, title, content) => {
    return await db.query("INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3)", [userId, title, content]);
};

export const getBlogsByUserId = async (userId) => {
    return await db.query("SELECT * FROM blogs WHERE user_id = $1", [userId]);
};

export const updateBlogTitle = async (userId, blogId, title) => {
    return await db.query(`
        UPDATE blogs
        SET title = $1
        WHERE id = $2 AND user_id = $3
        RETURNING *;
    `,[title, blogId, userId]);
};


