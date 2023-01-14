import { Response } from 'express';
import { IUserAuthRequest } from '../models/User';
import IController from './ControllerInterface';
import InvitationService from '../services/InvitationService';

class InvitationController implements IController {
  index = async (req: IUserAuthRequest, res: Response): Promise<Response> => {
    try {
      const service: InvitationService = new InvitationService(req);
      const { invitations, total, page, limit } = await service.getAll();

      return res.status(200).json({
        data: { invitations, total, page, limit },
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };

  store = async (req: IUserAuthRequest, res: Response): Promise<Response> => {
    try {
      const service: InvitationService = new InvitationService(req);
      const invitation = await service.store();

      return res.status(200).json({
        data: invitation,
        message: 'Invitation successfully created',
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };

  show = async (req: IUserAuthRequest, res: Response): Promise<Response> => {
    try {
      const service: InvitationService = new InvitationService(req);
      const invitation = await service.getOne();

      return res.status(200).json({
        data: invitation,
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };

  update = async (req: IUserAuthRequest, res: Response): Promise<Response> => {
    try {
      const service: InvitationService = new InvitationService(req);
      const invitation = await service.update();

      return res.status(200).json({
        data: invitation,
        message: 'Invitation successfully updated',
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };

  destroy = async (req: IUserAuthRequest, res: Response): Promise<Response> => {
    try {
      const service: InvitationService = new InvitationService(req);
      const invitation = await service.destroy();

      return res.status(200).json({
        data: invitation,
        message: 'Invitation successfully deleted',
      });
    } catch (err: any) {
      return res.status(422).json({
        errors: [{ msg: err.message }],
      });
    }
  };
}

export default new InvitationController();
