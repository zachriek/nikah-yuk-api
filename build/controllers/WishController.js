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
const WishService_1 = __importDefault(require("../services/WishService"));
class WishController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new WishService_1.default(req);
                const wishes = yield service.getAll();
                return res.status(200).json({
                    data: { wishes },
                });
            }
            catch (err) {
                return res.status(422).json({
                    errors: [{ msg: err.message }],
                });
            }
        });
        this.store = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new WishService_1.default(req);
                const wish = yield service.store();
                return res.status(200).json({
                    data: wish,
                    message: 'Wish successfully created',
                });
            }
            catch (err) {
                return res.status(422).json({
                    errors: [{ msg: err.message }],
                });
            }
        });
        this.show = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new WishService_1.default(req);
                const wish = yield service.getOne();
                return res.status(200).json({
                    data: wish,
                });
            }
            catch (err) {
                return res.status(422).json({
                    errors: [{ msg: err.message }],
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new WishService_1.default(req);
                const wish = yield service.update();
                return res.status(200).json({
                    data: wish,
                    message: 'Wish successfully updated',
                });
            }
            catch (err) {
                return res.status(422).json({
                    errors: [{ msg: err.message }],
                });
            }
        });
        this.destroy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new WishService_1.default(req);
                const wish = yield service.destroy();
                return res.status(200).json({
                    data: wish,
                    message: 'Wish successfully deleted',
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
exports.default = new WishController();
