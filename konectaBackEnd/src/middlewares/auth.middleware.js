const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  console.log('si le ando mandando ese requ', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido' });
  }
};

module.exports = { verifyToken };
