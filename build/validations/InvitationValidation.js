"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationValidation = void 0;
const express_validator_1 = require("express-validator");
exports.invitationValidation = [
    (0, express_validator_1.check)('groom.name').isString().withMessage('Groom name field is required'),
    (0, express_validator_1.check)('groom.username').isString().withMessage('Groom username field is required'),
    (0, express_validator_1.check)('groom.fatherName').isString().withMessage("Groom's father name field is required"),
    (0, express_validator_1.check)('groom.motherName').isString().withMessage("Groom's mother name field is required"),
    (0, express_validator_1.check)('groom.address').isString().withMessage('Groom address field is required'),
    (0, express_validator_1.check)('bride.name').isString().withMessage('Bride name field is required'),
    (0, express_validator_1.check)('bride.username').isString().withMessage('Bride username field is required'),
    (0, express_validator_1.check)('bride.fatherName').isString().withMessage("Bride's father name field is required"),
    (0, express_validator_1.check)('bride.motherName').isString().withMessage("Bride's mother name field is required"),
    (0, express_validator_1.check)('bride.address').isString().withMessage('Bride address field is required'),
    (0, express_validator_1.check)('date.ceremony').isString().withMessage('Date ceremony field is required'),
    (0, express_validator_1.check)('date.reception').isString().withMessage('Date reception field is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        return next();
    },
];
