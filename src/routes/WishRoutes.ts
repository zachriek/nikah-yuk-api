import WishController from '../controllers/WishController';
import { wishValidation } from '../validations/WishValidation';
import BaseRoutes from './BaseRoutes';

class WishRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', WishController.index);
    this.router.post('/', wishValidation, WishController.store);
    this.router.get('/:slug', WishController.show);
    this.router.patch('/:slug', WishController.update);
    this.router.delete('/:slug', WishController.destroy);
  }
}

export default new WishRoutes().router;
