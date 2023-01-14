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
const slugify_1 = __importDefault(require("slugify"));
const Invitation_1 = __importDefault(require("../models/Invitation"));
const Cloudinary_1 = __importDefault(require("../utils/Cloudinary"));
class InvitationService {
    constructor(req) {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const page = Number(this.query.page) - 1 || 0;
            const limit = Number(this.query.limit) || 5;
            const search = this.query.search || '';
            let options = { slug: { $regex: search, $options: 'i' } };
            const invitations = yield Invitation_1.default.find(options)
                .sort([['updatedAt', 'desc']])
                .skip(page * limit)
                .limit(limit);
            const total = yield Invitation_1.default.countDocuments(options);
            return { invitations, total, page: page + 1, limit };
        });
        this.store = () => __awaiter(this, void 0, void 0, function* () {
            const { groom, bride, date, messages, galleries } = this.body;
            if (galleries) {
                const result = galleries.forEach((gallery) => __awaiter(this, void 0, void 0, function* () {
                    yield Cloudinary_1.default.v2.uploader.upload(gallery, {
                        folder: 'galleries',
                    });
                }));
                galleries.push(result);
            }
            const isExist = yield Invitation_1.default.findOne({ userId: this.user._id });
            if (isExist)
                throw Error('You already made the invitation');
            const slug = (0, slugify_1.default)(`${groom.username} ${bride.username}`, { lower: true });
            const invitation = yield Invitation_1.default.create({ userId: this.user._id, slug, groom, bride, date, messages, galleries });
            return invitation;
        });
        this.getOne = () => __awaiter(this, void 0, void 0, function* () {
            const { slug } = this.params;
            const invitation = yield Invitation_1.default.findOne({ slug });
            if (!invitation)
                throw Error('Invitation not found');
            return invitation;
        });
        this.update = () => __awaiter(this, void 0, void 0, function* () {
            const { slug } = this.params;
            const { groom, bride, date, messages, galleries } = this.body;
            const newSlug = (0, slugify_1.default)(`${groom.username} ${bride.username}`, { lower: true });
            const newInvitation = { slug: newSlug, groom, bride, date, messages, galleries };
            const invitation = yield Invitation_1.default.findOneAndUpdate({ slug }, newInvitation);
            if (!invitation)
                throw Error('Invitation not found');
            return newInvitation;
        });
        this.destroy = () => __awaiter(this, void 0, void 0, function* () {
            const { slug } = this.params;
            const invitation = yield Invitation_1.default.findOneAndDelete({ slug });
            if (!invitation)
                throw Error('Invitation not found');
            return invitation;
        });
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
        this.user = req.user;
    }
}
exports.default = InvitationService;
