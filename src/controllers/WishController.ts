import { Request, Response } from 'express';
import IController from './ControllerInterface';
import WishService from '../services/WishService';

class WishController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: WishService = new WishService(req);
      const wishes = await service.getAll();

      return res.status(200).json({
        data: { wishes },
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };

  store = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: WishService = new WishService(req);
      const wish = await service.store();

      return res.status(200).json({
        data: wish,
        message: 'Wish successfully created',
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: WishService = new WishService(req);
      const wish = await service.getOne();

      return res.status(200).json({
        data: wish,
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: WishService = new WishService(req);
      const wish = await service.update();

      return res.status(200).json({
        data: wish,
        message: 'Wish successfully updated',
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };

  destroy = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: WishService = new WishService(req);
      const wish = await service.destroy();

      return res.status(200).json({
        data: wish,
        message: 'Wish successfully deleted',
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };
}

export default new WishController();
