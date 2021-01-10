class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCOde = statusCode;
    }
}

module.exports = ExpressError;