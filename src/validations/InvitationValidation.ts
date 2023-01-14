import { NextFunction, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { IUserAuthRequest } from '../models/User';

export const invitationValidation = [
  check('groom.name').isString().withMessage('Groom name field is required'),
  check('groom.username').isString().withMessage('Groom username field is required'),
  check('groom.fatherName').isString().withMessage("Groom's father name field is required"),
  check('groom.motherName').isString().withMessage("Groom's mother name field is required"),
  check('groom.address').isString().withMessage('Groom address field is required'),
  check('bride.name').isString().withMessage('Bride name field is required'),
  check('bride.username').isString().withMessage('Bride username field is required'),
  check('bride.fatherName').isString().withMessage("Bride's father name field is required"),
  check('bride.motherName').isString().withMessage("Bride's mother name field is required"),
  check('bride.address').isString().withMessage('Bride address field is required'),
  check('date.ceremony').isString().withMessage('Date ceremony field is required'),
  check('date.reception').isString().withMessage('Date reception field is required'),
  (req: IUserAuthRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return next();
  },
];
