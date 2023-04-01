"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishValidation = void 0;
const express_validator_1 = require("express-validator");
exports.wishValidation = [
    (0, express_validator_1.check)('name').isString().withMessage('Name field is required'),
    (0, express_validator_1.check)('body').isString().withMessage('body field is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        return next();
    },
];
