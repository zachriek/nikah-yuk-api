import { Request, Response } from 'express';

interface IController {
  register?(req: Request, res: Response): Response | Promise<Response>;
  login?(req: Request, res: Response): Response | Promise<Response>;
  index?(req: Request, res: Response): Response | Promise<Response>;
  store?(req: Request, res: Response): Response | Promise<Response>;
  show?(req: Request, res: Response): Response | Promise<Response>;
  update?(req: Request, res: Response): Response | Promise<Response>;
  destroy?(req: Request, res: Response): Response | Promise<Response>;
}

export default IController;
