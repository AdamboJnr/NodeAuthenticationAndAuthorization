const { schema } = require('../middleware/validate');
const Auth = require('../models/auth');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        // Validating user input using Joi        
        const { error } = await schema.validate(req.body)

        if(error) return res.status(400).json({ message: error.message });

        // Check whether user exists
        const userExist = await Auth.findOne({ email: req.body.email });

        if(userExist){
            return res.status(400).json({ msg: "User Already exists" });
        }

        const { email, password } = req.body;

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Saving the user to the database
        const savedUser = await Auth.create({ email, password: hashedPassword });

        res.status(200).json({ "User": savedUser });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const userLogin = async (req, res) => {
    res.status(200).json({ msg: "Succesful" });
}

module.exports = {
    registerUser,
    userLogin
}