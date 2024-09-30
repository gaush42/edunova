import { Request, Response } from 'express';
import Transaction from '../model/transaction';
import User from '../model/user';
import Book from '../model/book';

export const issueBook = async (req: Request, res: Response): Promise<void> => {
    const { bookId, userId } = req.body;
    try {
      const user = await User.findOne({ userId });
      const book = await Book.findOne({ bookId });
  
      if (!user || !book) {
        res.status(404).json({ error: 'User or Book not found' });
        return
      }
      const currentDate = new Date();
  
      const newTransaction = new Transaction({
        transactionId: new Date().getTime().toString(),
        userId,
        bookId,
        issueDate: currentDate,
        returnDate: null
      });
  
      await newTransaction.save();
      res.status(201).json(newTransaction);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
}
export const returnBook = async (req: Request, res: Response): Promise<void> => {
  const { bookId, userId } = req.body;

  const currentDate = new Date();

  try {
    const transaction = await Transaction.findOne({
      bookId,
      userId,
      returnDate: null
    });

    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return
    }

    const issueDate = new Date(transaction.issueDate);
    const daysRented = Math.ceil((new Date(currentDate).getTime() - issueDate.getTime()) / (1000 * 3600 * 24));
    const book = await Book.findOne({ bookId });

    
    const rentAmount = daysRented * Number(book?.rentPerDay ?? 0);
    transaction.returnDate = currentDate;
    transaction.totalRent = rentAmount;

    await transaction.save();
    res.json({ rentAmount });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}
export const bookHistory = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.query;

  try {
    const transactions = await Transaction.find({ bookId });
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
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}
export const totalRent = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.query;

  try {
    const transactions = await Transaction.find({ bookId });
    const totalRents = transactions.reduce((sum, t) => {
      const rent = t.totalRent != null ? Number(t.totalRent) : 0;
      return sum + rent;
    }, 0);
    
    //const totalRents = transactions.reduce((sum, t) => sum + Number(t.totalRent), 0);

    res.json({ totalRents });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}
export const userBooks = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.query;

  try {
    const transactions = await Transaction.find({ userId });
    const booksIssued = transactions.map(t => t.bookId);

    res.json({ booksIssued });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}
export const bookIssuedBetween = async (req: Request, res: Response): Promise<void> => {
  const { startDate, endDate } = req.body;

  try {
    const transactions = await Transaction.find({
      issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    const booksIssued = transactions.map(t => ({
      bookId: t.bookId,
      userId: t.userId,
      issueDate: t.issueDate
    }));

    res.json({ booksIssued });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}


  