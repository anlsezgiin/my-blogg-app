export const googleCallback = (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Giriş başarısız!" });
    }
  
    res.status(200).json({
      message: "Giriş başarılı!",
      user: req.user
    });
  };
  