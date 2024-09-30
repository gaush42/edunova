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
exports.advSearch = exports.rentRange = exports.search = exports.getAllBooks = exports.addBook = void 0;
const book_1 = __importDefault(require("../model/book"));
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, bookName, category, rentPerDay } = req.body;
    try {
        const newBook = new book_1.default({
            bookId,
            bookName,
            category,
            rentPerDay
        });
        yield newBook.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({ error: 'Book ID already exists' });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.addBook = addBook;
const getAllBooks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.find();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllBooks = getAllBooks;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { term } = req.query;
    if (!term) {
        res.status(400).json({ error: 'Search term is required' });
        return;
    }
    try {
        const books = yield book_1.default.find({ bookName: { $regex: term, $options: 'i' } });
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.search = search;
const rentRange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { minRent, maxRent } = req.query;
    try {
        const books = yield book_1.default.find({ rentPerDay: { $gte: minRent, $lte: maxRent } });
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.rentRange = rentRange;
const advSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, term, minRent, maxRent } = req.query;
    try {
        const books = yield book_1.default.find({
            category,
            bookName: { $regex: term, $options: 'i' },
            rentPerDay: { $gte: minRent, $lte: maxRent }
        });
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.advSearch = advSearch;
