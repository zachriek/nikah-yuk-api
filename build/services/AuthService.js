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
const User_1 = __importDefault(require("../models/User"));
class AuthService {
    constructor(req) {
        this.register = () => __awaiter(this, void 0, void 0, function* () {
            const { name, username, email, password } = this.body;
            const usernameExists = yield User_1.default.findOne({ username });
            if (usernameExists)
                throw Error('Username already in use');
            const emailExists = yield User_1.default.findOne({ email });
            if (emailExists)
                throw Error('Email already in use');
            const hashedPassword = yield User_1.default.hashPassword(password);
            const user = yield User_1.default.create({ name, username, email, password: hashedPassword });
            const token = User_1.default.createToken(user._id);
            return { user, token };
        });
        this.login = () => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = this.body;
            const user = yield User_1.default.findOne({ email });
            if (!user)
                throw Error('Incorrect email');
            const match = yield User_1.default.comparePassword(password, user.password);
            if (!match)
                throw Error('Incorrect password');
            const token = User_1.default.createToken(user._id);
            return { user, token };
        });
        this.body = req.body;
    }
}
exports.default = AuthService;
