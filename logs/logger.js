const { createLogger, format, transports, info }= require('winston');
const path = require('path')

const authlogger = createLogger({
    transports: [
        new transports.File({
            filename: path.join(__dirname,'requests.log',),
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: path.join(__dirname,'error.log'),
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = authlogger;