"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const AuthValidation_1 = require("../validations/AuthValidation");
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
class AuthRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.post('/register', AuthValidation_1.registerValidation, AuthController_1.default.register);
        this.router.post('/login', AuthValidation_1.loginValidation, AuthController_1.default.login);
    }
}
exports.default = new AuthRoutes().router;
