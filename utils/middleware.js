const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return res.status(400).send({ error: 'malformatted id'});
    } else if (error.name === 'ValidationError') {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
    return next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
