"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../services/AuthService"));
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new AuthService_1.default(req);
                const { user, token } = yield service.register();
                return res.status(200).json({
                    data: {
                        user: {
                            name: user.name,
                            username: user.username,
                            role: user.role,
                            email: user.email,
                            token,
                        },
                    },
                    message: 'User successfully registered',
                });
            }
            catch (err) {
                return res.status(422).json({
                    errors: [{ msg: err.message }],
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new AuthService_1.default(req);
                const { user, token } = yield service.login();
                return res.status(200).json({
                    data: {
                        user: {
                            name: user.name,
                            username: user.username,
                            role: user.role,
                            email: user.email,
                            token,
                        },
                    },
                    message: 'User successfully login',
                });
            }
            catch (err) {
                return res.status(422).json({
                    errors: [{ msg: err.message }],
                });
            }
        });
    }
}
exports.default = new AuthController();
