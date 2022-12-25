const { schema } = require('../middleware/validate');

const registerUser = async (req, res) => {
    try {        
        const { error } = await schema.validate(req.body)

        if(error) return res.status(401).json({ message: error.message });

        res.status(200).json({ email: req.body.email, password: req.body.password });

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