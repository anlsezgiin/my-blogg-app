import connectDB from "../database/postgre.js";

const db = connectDB();

export const createUser = async (username, hashedPassword) => {
    return await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
};

export const loginProcess = async (username) => {
    return await db.query("SELECT * FROM users WHERE username = $1", [username]);
};
