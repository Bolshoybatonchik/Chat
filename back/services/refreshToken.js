const jwt = require('jsonwebtoken')


const refreshToken = (token) => {
    const originalDecoded = jwt.decode(token, {complete: true});
    const refreshed = jwt.refresh(originalDecoded, 3600, process.env.JWT_SECRET);
    return refreshed
}

module.exports = refreshToken;