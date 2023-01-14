import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';

// Database Connection
import dbConnect from './config/dbConnect';

// Routes
import AuthRoutes from './routes/AuthRoutes';
import InvitationRoutes from './routes/InvitationRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    dbConnect();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json({ limit: '30mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/invitations', InvitationRoutes);
  }
}

const app = new App().app;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
