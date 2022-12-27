const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const accessLogStream = fs.createWriteStream(path.join(__dirname, '..' , 'logs', 'request.log'), { flags: 'a'});

const logger = morgan('common', { stream: accessLogStream});


module.exports = logger;