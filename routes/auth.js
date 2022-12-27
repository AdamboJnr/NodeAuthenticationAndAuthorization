const router = require('express').Router();
const { userLogin, registerUser, getAllUsers } = require('../controllers/auth')
const auth = require('../middleware/auth');
const logger = require('../middleware/logger');
const notFound = require('../middleware/notFound')

router.route('/login').post(logger, userLogin);
router.route('/register').post(logger, registerUser);
router.route('/users').get( logger, auth, getAllUsers);
router.use(notFound)

module.exports = router;