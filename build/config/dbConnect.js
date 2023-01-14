"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = () => {
    mongoose_1.default.connect(`${process.env.MONGO_URI}`);
    mongoose_1.default.connection.on('connected', () => console.log('Database connected successfully'));
    mongoose_1.default.connection.on('error', (err) => console.log(`Error while connecting to database : ${err}`));
    mongoose_1.default.connection.on('disconnected', () => console.log('Database connection disabled'));
};
exports.default = dbConnect;
