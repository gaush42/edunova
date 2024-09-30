"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    bookId: { type: String, required: true, unique: true },
    bookName: { type: String, required: true },
    category: { type: String, required: true },
    rentPerDay: { type: Number, required: true }
});
const Book = mongoose_1.default.model('Book', bookSchema);
exports.default = Book;
