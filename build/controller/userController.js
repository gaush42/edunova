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
exports.addUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../model/user"));
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const generateUserId = (email) => {
    const prefix = email.slice(0, 2);
    const randomNumber = Math.random().toString().slice(2, 10);
    return `${prefix}${randomNumber}`;
};
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    if (!name || !email) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    try {
        const userId = generateUserId(email);
        const newUser = new user_1.default({
            userId,
            name,
            email
        });
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.addUser = addUser;
