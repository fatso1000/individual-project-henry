"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Petition data validation error: ${error.details
            .map((x) => x.message)
            .join(", ")}`);
    }
    else {
        req.body = value;
        next();
    }
}
exports.default = validateRequest;
