const bcrypt = require('bcrypt');

module.exports = (pass, hash) => {
    return bcrypt.compare(pass, hash);
};

