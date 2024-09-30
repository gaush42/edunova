import { Request, Response } from 'express';
import Book from '../model/book';

export const addBook = async (req: Request, res: Response): Promise<void> => {
    const { bookId, bookName, category, rentPerDay } = req.body;

    try {
        const newBook = new Book({
            bookId,
            bookName,
            category,
            rentPerDay
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error: any) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({ error: 'Book ID already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
export const getAllBooks = async (_req: Request, res: Response): Promise<void> => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
export const search = async (req: Request, res: Response): Promise<void> => {
    const { term } = req.query;

    if (!term) {
        res.status(400).json({ error: 'Search term is required' });
        return 
    }
    try {
        const books = await Book.find({ bookName: { $regex: term, $options: 'i' } });
        res.json(books);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
export const rentRange = async (req: Request, res: Response): Promise<void> =>{
    const { minRent, maxRent } = req.query;
    try {
      const books = await Book.find({ rentPerDay: { $gte: minRent, $lte: maxRent } });
      res.json(books);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
}
export const advSearch = async (req: Request, res: Response): Promise<void> => {
    const { category, term, minRent, maxRent } = req.query;
    try {
      const books = await Book.find({
        category,
        bookName: { $regex: term, $options: 'i' },
        rentPerDay: { $gte: minRent, $lte: maxRent }
      });
      res.json(books);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
}
  