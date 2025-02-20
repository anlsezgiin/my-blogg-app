import connectDB from "../database/postgre.js";

const db = connectDB();

export const createUser = async (username, password) => {
    return await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
};