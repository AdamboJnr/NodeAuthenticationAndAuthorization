const { schema } = require('../middleware/validate');
const Auth = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const registerUser = asyncWrapper( async (req, res, next) => {
        // Validating user input using Joi        
        const { error } = await schema.validate(req.body)

        if(error) return res.status(400).json({ message: error.message });

        // Check whether user exists
        const userExist = await Auth.findOne({ email: req.body.email });

        if(userExist){
            return next(createCustomError('User already exists', 400));
        }

        const { email, password } = req.body;

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Saving the user to the database
        const savedUser = await Auth.create({ email, password: hashedPassword });

        // res.status(200).json({ message: "User Saved", "User": savedUser });

        const token = await jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: 300000})

        res.json({ token });
})

const userLogin = asyncWrapper( async (req, res, next) => {
        // Get the email and password from the user
        const { email, password} = req.body;

        // Get the email from the database
        const user = await Auth.findOne({ email: email});

        if(!user){
            return next(createCustomError('Invalid Credentials', 404));
        }
        
        //Compare the password from user and from the db using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return next(createCustomError('Invalid Credentials', 404));
        }

        // Assign user a token using JWT
        const token = await jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: 300000});

        res.json({ token });
})

const getAllUsers = asyncWrapper( async (req, res) => {
        const users = await Auth.find({});

        res.status(200).json({ users });
})

module.exports = {
    registerUser,
    userLogin,
    getAllUsers
}