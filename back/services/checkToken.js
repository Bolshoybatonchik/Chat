const jwt = require('jsonwebtoken-refresh');

const checkToken = (req, res, next) => {
    const secretKey = process.env.JWT_SECRET;
    const token = req.headers.authorization;
    const originalDecoded = jwt.decode(token, {complete: true});
    const refreshed = jwt.refresh(originalDecoded, 3600, secretKey);
    jwt.verify(refreshed, secretKey, (err, decoded) => {
        if (decoded) {
            next();
        } else {
            res.status(401).send('token_invalid');
        }
    });
};


module.exports = checkToken;
