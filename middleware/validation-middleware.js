const validator = require('../helper/validate');
const validateTask = async (req, res, next) => {
    const validationRule = {
        "taskName": "required|string",
        "priority": "required|string",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const validateActivity = async (req, res, next) => {
    const validationRule = {
        "activityName": "required|string",
        "description": "required|string",
        "startDate": "required|string",
        "endDate": "required|string",
        "startTime": "required|string",
        "endTime": "string",
        "location": "string",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    validateTask,
    validateActivity
};