import { Request, Response } from 'express';
import IController from './ControllerInterface';
import AuthService from '../services/AuthService';

class AuthController implements IController {
  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: AuthService = new AuthService(req);
      const { user, token } = await service.register();

      return res.status(200).json({
        data: {
          user: {
            name: user.name,
            username: user.username,
            role: user.role,
            email: user.email,
            token,
          },
        },
        message: 'User successfully registered',
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: AuthService = new AuthService(req);
      const { user, token } = await service.login();

      return res.status(200).json({
        data: {
          user: {
            name: user.name,
            username: user.username,
            role: user.role,
            email: user.email,
            token,
          },
        },
        message: 'User successfully login',
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };
}

export default new AuthController();
