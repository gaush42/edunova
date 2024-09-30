"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectDB() {
    const mongoUrl = process.env.MONGO_CONNECTION_URL || 'mongodb://localhost:27017/assignment';
    if (!mongoUrl) {
        throw new Error('MONGO_CONNECTION_URL is not defined in the environment variables.');
    }
    mongoose_1.default.connect(mongoUrl, {}).then(() => {
        console.log('Database connected 🥳🥳🥳🥳');
    }).catch((err) => {
        console.error('Connection failed ☹️☹️☹️☹️', err);
    });
}
exports.default = connectDB;
