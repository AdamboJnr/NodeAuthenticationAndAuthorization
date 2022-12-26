const router = require('express').Router();
const { userLogin, registerUser, getAllUsers } = require('../controllers/auth')
const auth = require('../middleware/auth');

router.route('/login').post(userLogin);
router.route('/register').post(registerUser);
router.route('/users').get( auth, getAllUsers);

module.exports = router;