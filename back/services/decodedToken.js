const jwt = require('jsonwebtoken');

const decodedToken = (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);

    if (decoded) {
        return decoded
    } else {
        res.status(401).send('token_invalid');
    }
};


module.exports = decodedToken;
