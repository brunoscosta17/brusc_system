const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const consts = require('../consts');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
            let user = await UserModel.findOne({ email: req.body.email });
            if (!user) {
                const user = new UserModel(req.body);
                user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts)
                await user.save();
                delete user.password;
                res.status(200).json(user);
            }
            res.status(403).json({ message: "Email already registered!", error: error });
        } catch (error) {
            res.status(500).json({ message: "Error while saving user!", error: error });
        }
    },

    login: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        UserModel.findOne({ email: email }).lean().exec((error, user) => {
            if (error) {
                return res.status(500).json({
                    message: 'Server error', error: error
                });
            }
            const auth_err = password == '' || password == null || !user;
            if (!auth_err) {
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT });
                    delete user.password;
                    return res.json({ ...user, token: token });
                }
            }
            return res.status(404).json({
                message: 'Wrong email or password!'
            });
        });
    }
}