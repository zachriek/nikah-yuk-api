import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const wishValidation = [
  check('name').isString().withMessage('Name field is required'),
  check('body').isString().withMessage('body field is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return next();
  },
];
