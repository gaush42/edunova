import express, { Router } from 'express';
import { addUser, getAllUsers } from '../controller/userController';
import { 
    addBook, 
    advSearch, 
    getAllBooks, 
    rentRange, 
    search } from '../controller/bookController';
import { 
    bookHistory, 
    bookIssuedBetween, 
    issueBook, 
    returnBook, 
    totalRent, 
    userBooks } from '../controller/transactionController';

const router: Router = express.Router();

router.post('/adduser', addUser);
router.get('/users', getAllUsers);
router.post('/addbook', addBook)
router.get('/books', getAllBooks)
router.get('/books/search', search)
router.get('/books/rent-range', rentRange)
router.get('/books/adv-search', advSearch)
router.post('/transaction/issue-book', issueBook)
router.post('/transaction/return-book', returnBook)
router.get('/transaction/book-history', bookHistory)
router.get('/transaction/total-rent', totalRent)
router.get('/transaction/user-books', userBooks)
router.post('/transaction/date-range', bookIssuedBetween)

export default router;