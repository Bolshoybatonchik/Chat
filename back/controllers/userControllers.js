const bcrypt = require("bcrypt");
const decodedToken = require("../services/decodedToken");
const {findUserService} = require("../services");
const {checkHashPassword} = require("../services");
const {createToken} = require("../services");
const {User} = require('../models')

module.exports = {

    registerUser:
        async (req, res) => {
            const {name, email, password} = req.body
            try {
                const hashPassword = await bcrypt.hash(password, 10);
                const result = await User.create({
                    name: name,
                    password: hashPassword,
                    email: email,
                })
                if (result) {
                    const token = createToken({
                        userId: result.id,
                        email: result.email,
                    })
                    res.status(200).json({
                        id_token: `${token}`
                    })
                }
            }
            catch (e) {
                res.status(400).json({
                    message:  "A user with this email already exists"
                })
            }
        },

    loginUser: async (req, res) => {
        const {email, password} = req.body;
        try {
            const candidate = await findUserService(email);
            if (!candidate) {
                res.status(404).json({
                    message: "It looks like you entered your email or password incorrectly. Want to try again?"
                })
                return
            }
            const isComparePassword = await checkHashPassword(password, candidate.password);
            if (isComparePassword) {
                const token = createToken({
                    email: candidate.email,
                    userId: candidate.id
                })
                res.status(200).json({
                    id_token: `${token}`
                })
                return
            }
            res.status(400).json({
                message: "It looks like you entered your email or password incorrectly. Want to try again?"
            })
        } catch (e) {
            res.status(400).json({
                message: e.message
            })
        }
    },

    changePassword: async (req, res, next) => {
        const {email, password} = req.body;
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            await User.update(
                {password: hashPassword},
                {where: {email}}
            )
            const result = await findUserService(email);
            if (!result) {
                res.status(404).json({
                    message: "It looks like you entered your email or password incorrectly. Want to try again?"
                })
                return
            }
            const token = createToken({
                email: result.email,
                userId: result.id
            })
            res.status(200).json({
                id_token: `${token}`
            })

        } catch (e) {
            res.status(400).json({
                message: e.message
            })
        }
    },

    getUserData: async (req, res) => {
        try {
            const {email} = await decodedToken(req);
            const result = await User.findOne({where: {email}});
            const {name, balance} = result;
            if (result) {
                res.json({
                    user_info_token:
                        {
                            name,
                            email: result.email,
                            id: result.id,
                            balance
                        }
                })
            }
        } catch (e) {
            res.status(400).json({
                message: e.message
            })
        }
    },
}
