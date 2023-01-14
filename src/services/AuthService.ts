import { Request } from 'express';
import User from '../models/User';

class AuthService {
  body: Request['body'];

  constructor(req: Request) {
    this.body = req.body;
  }

  register = async () => {
    const { name, username, email, password } = this.body;

    const usernameExists = await User.findOne({ username });
    if (usernameExists) throw Error('Username already in use');

    const emailExists = await User.findOne({ email });
    if (emailExists) throw Error('Email already in use');

    const hashedPassword = await User.hashPassword(password);
    const user = await User.create({ name, username, email, password: hashedPassword });
    const token = User.createToken(user._id);

    return { user, token };
  };

  login = async () => {
    const { email, password } = this.body;

    const user = await User.findOne({ email });
    if (!user) throw Error('Incorrect email');

    const match = await User.comparePassword(password, user.password);
    if (!match) throw Error('Incorrect password');

    const token = User.createToken(user._id);

    return { user, token };
  };
}

export default AuthService;
