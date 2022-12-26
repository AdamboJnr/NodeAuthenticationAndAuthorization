const { createLogger, format, transports }= require('winston');
const {printf, combine, timestamp} = format;


function buildDevLogger() {
    const logFormat = printf(({ level, message, stack, timestamp }) => {
        return `${timestamp} ${level}: ${ stack || message}`;
    });
    
    const logger = createLogger({
        format: combine(
            format.colorize(),
            timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.errors({ stack: true }),
            logFormat,
        ),
        transports: [new transports.Console()],
    });
}

// module.exports = buildDevLogger;