import { Request } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUserAuthRequest extends Request {
  user?: any;
}

interface UserModelInterface extends mongoose.Model<any> {
  createToken(_id: string): any;
  hashPassword(password: string): any;
  comparePassword(password: string, hashedPassword: string): any;
}

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.createToken = function (_id: string) {
  const token = jwt.sign({ _id }, `${process.env.SECRET_KEY}`, { expiresIn: '3h' });
  return token;
};

UserSchema.statics.hashPassword = async function (password: string) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.statics.comparePassword = async function (password: string, hashedPassword: string) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

const User = mongoose.model<any, UserModelInterface>('User', UserSchema);

export default User;
