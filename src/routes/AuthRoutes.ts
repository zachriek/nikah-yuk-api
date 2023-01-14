import AuthController from '../controllers/AuthController';
import { loginValidation, registerValidation } from '../validations/AuthValidation';
import BaseRoutes from './BaseRoutes';

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/register', registerValidation, AuthController.register);
    this.router.post('/login', loginValidation, AuthController.login);
  }
}

export default new AuthRoutes().router;
