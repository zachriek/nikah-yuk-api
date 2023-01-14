import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUserAuthRequest } from '../models/User';

export const auth = async (req: IUserAuthRequest, res: Response, next: NextFunction): Promise<any> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Authorization token required',
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, `${process.env.SECRET_KEY}`) as JwtPayload;
    req.user = await User.findOne({ _id });
    next();
  } catch (err: any) {
    res.status(422).json({
      message: `Request is not authorized ${err.message}`,
    });
  }
};
