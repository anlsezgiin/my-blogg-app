import connectDB from "../database/postgre.js";
const db = connectDB();

/**
 * Google'dan gelen kullanıcıyı bul veya oluştur
 * @param {Object} param0 { googleId, email, username }
 */
export const findOrCreateUser = async ({ googleId, email, username }) => {
  try {
    console.log("Google Profile:", profile);
    // 1. Kullanıcı zaten var mı? (google_id ile kontrol)
    const existingUser = await db.query(
      "SELECT * FROM users WHERE google_id = $1",
      [googleId]
    );

    if (existingUser.rows.length > 0) {
      return existingUser.rows[0]; // varsa onu döndür
    }

    // 2. Kullanıcı yoksa: kayıt et
    const newUser = await db.query(
      "INSERT INTO users (google_id, email, username) VALUES ($1, $2, $3) RETURNING *",
      [googleId, email, username]
    );
    return newUser.rows[0];
    
  } catch (err) {
    console.error("findOrCreateUser Hatası:", err);
    throw err;
  }
};
