"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvitationController_1 = __importDefault(require("../controllers/InvitationController"));
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const InvitationValidation_1 = require("../validations/InvitationValidation");
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
class InvitationRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.use(AuthMiddleware_1.auth);
        this.router.get('/', InvitationController_1.default.index);
        this.router.post('/', InvitationValidation_1.invitationValidation, InvitationController_1.default.store);
        this.router.get('/:slug', InvitationController_1.default.show);
        this.router.patch('/:slug', InvitationController_1.default.update);
        this.router.delete('/:slug', InvitationController_1.default.destroy);
    }
}
exports.default = new InvitationRoutes().router;
