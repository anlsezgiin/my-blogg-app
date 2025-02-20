import connectDB from "../database/postgre.js";

const db = connectDB();

export const createUser = async (username, password) => {
    return await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
};

export const loginProcess = async (username, password) => {
    return await db.query("SELECT * FROM users where username=$1 and password=$2", [username,password]);
};