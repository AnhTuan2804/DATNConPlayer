const errorMapping = {
    100: 'INVALID_KEY',
    101: 'INVALID_TIME_ACCESS',
    102: 'INVALID_TOKEN',
    105: 'INVALID_AUTH'
}
class GeneralErrorHandler {
    handleError(code, req, res, next) {
        if (code) {
            if (code instanceof Error) {
                res.status(400).send({ code: 400, message: code.message });
            } else if (errorMapping[code] !== undefined) {
                res.status(401).send({ code: code, message: errorMapping[code] });
            } else {
                res.status(500).send({ code: 500, message: 'UNHANDLED_ERROR' });
            }
        } else {
            res.status(500).send({ code: 500, message: 'UNHANDLED_ERROR' });
        }
    };
}

module.exports = new GeneralErrorHandler();