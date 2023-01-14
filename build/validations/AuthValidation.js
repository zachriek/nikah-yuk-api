"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.check)('name').isString().isLength({ min: 3 }).withMessage('Name field is required'),
    (0, express_validator_1.check)('username').isString().isLength({ min: 3 }).withMessage('Username field is required'),
    (0, express_validator_1.check)('email').isString().isLength({ min: 3 }).withMessage('Email field is required').bail().isEmail().withMessage('Invalid email').bail(),
    (0, express_validator_1.check)('password')
        .isString()
        .withMessage('Password field is required')
        .bail()
        .isStrongPassword()
        .withMessage('Please choose a stronger password')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password length must be greater than 6 characters')
        .bail(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        return next();
    },
];
exports.loginValidation = [
    (0, express_validator_1.check)('email').isString().withMessage('Email field is required').bail().isEmail().withMessage('Invalid email').bail(),
    (0, express_validator_1.check)('password')
        .isString()
        .withMessage('Password field is required')
        .bail()
        .isStrongPassword()
        .withMessage('Please choose a stronger password')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password length must be greater than 6 characters')
        .bail(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        return next();
    },
];
