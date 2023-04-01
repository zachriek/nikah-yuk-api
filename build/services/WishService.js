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
const Wish_1 = __importDefault(require("../models/Wish"));
class WishService {
    constructor(req) {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const wishes = yield Wish_1.default.find({});
            return wishes;
        });
        this.store = () => __awaiter(this, void 0, void 0, function* () {
            const { name, body } = this.body;
            const slug = (0, slugify_1.default)(name, { lower: true });
            const wish = yield Wish_1.default.create({ name, slug, body });
            return wish;
        });
        this.getOne = () => __awaiter(this, void 0, void 0, function* () {
            const { slug } = this.params;
            const wish = yield Wish_1.default.findOne({ slug });
            if (!wish)
                throw Error('Wish not found');
            return wish;
        });
        this.update = () => __awaiter(this, void 0, void 0, function* () {
            const { slug } = this.params;
            const { name, body } = this.body;
            const newSlug = (0, slugify_1.default)(name, { lower: true });
            const newWish = { slug: newSlug, name, body };
            const wish = yield Wish_1.default.findOneAndUpdate({ slug }, newWish);
            if (!wish)
                throw Error('Wish not found');
            return newWish;
        });
        this.destroy = () => __awaiter(this, void 0, void 0, function* () {
            const { slug } = this.params;
            const wish = yield Wish_1.default.findOneAndDelete({ slug });
            if (!wish)
                throw Error('Wish not found');
            return wish;
        });
        this.body = req.body;
        this.params = req.params;
    }
}
exports.default = WishService;
