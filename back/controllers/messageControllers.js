const {Message} = require('../models')

module.exports = {
    getAllMessage: async (req, res) => {
        try {
            const result = await Message.findAll()
            res.json(result)
        } catch (e) {
            console.log('@@@ERROR', e);
        }
    }
}
