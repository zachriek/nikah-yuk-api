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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
UserSchema.statics.createToken = function (_id) {
    const token = jsonwebtoken_1.default.sign({ _id }, `${process.env.SECRET_KEY}`, { expiresIn: '3h' });
    return token;
};
UserSchema.statics.hashPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        const hash = yield bcrypt_1.default.hash(password, salt);
        return hash;
    });
};
UserSchema.statics.comparePassword = function (password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const match = yield bcrypt_1.default.compare(password, hashedPassword);
        return match;
    });
};
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
