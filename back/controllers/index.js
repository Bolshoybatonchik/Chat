const {getAllMessage,} = require('./messageControllers')
const {registerUser,getUserData,loginUser,changePassword} =require('./userControllers')

module.exports = {getAllMessage,registerUser,getUserData,loginUser,changePassword}
