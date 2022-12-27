
class customApiError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode =  statusCode;
    }
}

const createCustomError = (msg, statusCode) => {
    return new customApiError(msg, statusCode);
}

module.exports = { createCustomError, customApiError };