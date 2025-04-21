import connectDB from "../database/postgre.js";

const db = connectDB();

export const createUser = async (username, email, hashedPassword) => {
    return await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);
};

export const loginProcess = async (username) => {
    return await db.query("SELECT * FROM users WHERE username = $1", [username]);
};
