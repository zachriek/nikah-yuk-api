"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WishController_1 = __importDefault(require("../controllers/WishController"));
const WishValidation_1 = require("../validations/WishValidation");
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
class WishRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.get('/', WishController_1.default.index);
        this.router.post('/', WishValidation_1.wishValidation, WishController_1.default.store);
        this.router.get('/:slug', WishController_1.default.show);
        this.router.patch('/:slug', WishController_1.default.update);
        this.router.delete('/:slug', WishController_1.default.destroy);
    }
}
exports.default = new WishRoutes().router;
