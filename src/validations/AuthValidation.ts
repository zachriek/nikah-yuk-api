import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const registerValidation = [
  check('name').isString().isLength({ min: 3 }).withMessage('Name field is required'),
  check('username').isString().isLength({ min: 3 }).withMessage('Username field is required'),
  check('email').isString().isLength({ min: 3 }).withMessage('Email field is required').bail().isEmail().withMessage('Invalid email').bail(),
  check('password')
    .isString()
    .withMessage('Password field is required')
    .bail()
    .isStrongPassword()
    .withMessage('Please choose a stronger password')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password length must be greater than 6 characters')
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return next();
  },
];

export const loginValidation = [
  check('email').isString().withMessage('Email field is required').bail().isEmail().withMessage('Invalid email').bail(),
  check('password')
    .isString()
    .withMessage('Password field is required')
    .bail()
    .isStrongPassword()
    .withMessage('Please choose a stronger password')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password length must be greater than 6 characters')
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return next();
  },
];
