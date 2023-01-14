import InvitationController from '../controllers/InvitationController';
import { auth } from '../middlewares/AuthMiddleware';
import { invitationValidation } from '../validations/InvitationValidation';
import BaseRoutes from './BaseRoutes';

class InvitationRoutes extends BaseRoutes {
  public routes(): void {
    this.router.use(auth);
    this.router.get('/', InvitationController.index);
    this.router.post('/', invitationValidation, InvitationController.store);
    this.router.get('/:slug', InvitationController.show);
    this.router.patch('/:slug', InvitationController.update);
    this.router.delete('/:slug', InvitationController.destroy);
  }
}

export default new InvitationRoutes().router;
