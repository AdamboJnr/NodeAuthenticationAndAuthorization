const { schema } = require('../middleware/validate');
const Auth = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        // res.status(200).json({ message: "User Saved", "User": savedUser });

        const token = await jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: 300000})

        res.json({ token });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password} = req.body;

        const user = await Auth.findOne({ email: email});

        if(!user){
            return res.status(404).json({ message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(404).json({ message: "Invalid Credentials"});
        }

        const token = await jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: 300000});

        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

    // res.status(200).json({ msg: "Succesful" });
}

const getAllUsers = async (req, res) => {
    try {
        const users = await Auth.find({});

        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    userLogin,
    getAllUsers
}