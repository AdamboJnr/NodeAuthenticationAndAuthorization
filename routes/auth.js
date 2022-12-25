const router = require('express').Router();
const { userLogin, registerUser } = require('../controllers/auth')

router.route('/login').post(userLogin);
router.route('/register').post(registerUser);

module.exports = router;