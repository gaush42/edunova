"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    transactionId: { type: String, required: true, unique: true },
    bookId: { type: mongoose_1.default.Schema.Types.String, ref: 'Book', required: true },
    userId: { type: mongoose_1.default.Schema.Types.String, ref: 'User', required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    totalRent: { type: Number }
});
const Transaction = mongoose_1.default.model('Transaction', transactionSchema);
exports.default = Transaction;
