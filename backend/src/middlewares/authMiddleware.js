export const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Yetkilendirme başarısız! Lütfen giriş yapın." });
    }
    next();
};
