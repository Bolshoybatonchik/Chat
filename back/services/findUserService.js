const { User } = require('../models')


const findUser = async (email) => {
    try {
        return await User.findOne({where: {email}})
    } catch (e) {
        return e
    }
}
module.exports = findUser;


