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
const InvitationService_1 = __importDefault(require("../services/InvitationService"));
class InvitationController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new InvitationService_1.default(req);
                const { invitations, total, page, limit } = yield service.getAll();
                return res.status(200).json({
                    data: { invitations, total, page, limit },
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
                const service = new InvitationService_1.default(req);
                const invitation = yield service.store();
                return res.status(200).json({
                    data: invitation,
                    message: 'Invitation successfully created',
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
                const service = new InvitationService_1.default(req);
                const invitation = yield service.getOne();
                return res.status(200).json({
                    data: invitation,
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
                const service = new InvitationService_1.default(req);
                const invitation = yield service.update();
                return res.status(200).json({
                    data: invitation,
                    message: 'Invitation successfully updated',
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
                const service = new InvitationService_1.default(req);
                const invitation = yield service.destroy();
                return res.status(200).json({
                    data: invitation,
                    message: 'Invitation successfully deleted',
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
exports.default = new InvitationController();
