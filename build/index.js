"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
// Database Connection
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
// Routes
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const InvitationRoutes_1 = __importDefault(require("./routes/InvitationRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        (0, dbConnect_1.default)();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(body_parser_1.default.json({ limit: '30mb' }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: '30mb' }));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/v1/auth', AuthRoutes_1.default);
        this.app.use('/api/v1/invitations', InvitationRoutes_1.default);
    }
}
const app = new App().app;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
