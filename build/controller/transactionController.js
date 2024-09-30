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
exports.bookIssuedBetween = exports.userBooks = exports.totalRent = exports.bookHistory = exports.returnBook = exports.issueBook = void 0;
const transaction_1 = __importDefault(require("../model/transaction"));
const user_1 = __importDefault(require("../model/user"));
const book_1 = __importDefault(require("../model/book"));
const issueBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, userId } = req.body;
    try {
        const user = yield user_1.default.findOne({ userId });
        const book = yield book_1.default.findOne({ bookId });
        if (!user || !book) {
            res.status(404).json({ error: 'User or Book not found' });
            return;
        }
        const currentDate = new Date();
        const newTransaction = new transaction_1.default({
            transactionId: new Date().getTime().toString(),
            userId,
            bookId,
            issueDate: currentDate,
            returnDate: null
        });
        yield newTransaction.save();
        res.status(201).json(newTransaction);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.issueBook = issueBook;
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { bookId, userId } = req.body;
    const currentDate = new Date();
    try {
        const transaction = yield transaction_1.default.findOne({
            bookId,
            userId,
            returnDate: null
        });
        if (!transaction) {
            res.status(404).json({ error: 'Transaction not found' });
            return;
        }
        const issueDate = new Date(transaction.issueDate);
        const daysRented = Math.ceil((new Date(currentDate).getTime() - issueDate.getTime()) / (1000 * 3600 * 24));
        const book = yield book_1.default.findOne({ bookId });
        const rentAmount = daysRented * Number((_a = book === null || book === void 0 ? void 0 : book.rentPerDay) !== null && _a !== void 0 ? _a : 0);
        transaction.returnDate = currentDate;
        transaction.totalRent = rentAmount;
        yield transaction.save();
        res.json({ rentAmount });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.returnBook = returnBook;
const bookHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.query;
    try {
        const transactions = yield transaction_1.default.find({ bookId });
        const currentlyIssued = transactions.find(t => t.returnDate === null);
        const issuedHistory = transactions.map(t => ({
            userId: t.userId,
            issueDate: t.issueDate,
            returnDate: t.returnDate
        }));
        res.json({
            totalIssuedCount: issuedHistory.length,
            issuedHistory,
            currentlyIssued: currentlyIssued ? currentlyIssued.userId : 'Not currently issued'
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.bookHistory = bookHistory;
const totalRent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.query;
    try {
        const transactions = yield transaction_1.default.find({ bookId });
        const totalRents = transactions.reduce((sum, t) => {
            const rent = t.totalRent != null ? Number(t.totalRent) : 0;
            return sum + rent;
        }, 0);
        res.json({ totalRents });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.totalRent = totalRent;
const userBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const transactions = yield transaction_1.default.find({ userId });
        const booksIssued = transactions.map(t => t.bookId);
        res.json({ booksIssued });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.userBooks = userBooks;
const bookIssuedBetween = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    try {
        const transactions = yield transaction_1.default.find({
            issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });
        const booksIssued = transactions.map(t => ({
            bookId: t.bookId,
            userId: t.userId,
            issueDate: t.issueDate
        }));
        res.json({ booksIssued });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.bookIssuedBetween = bookIssuedBetween;
