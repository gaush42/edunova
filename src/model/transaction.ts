import mongoose, { Document, Model } from 'mongoose';

interface ITransaction extends Document {
    transactionId:String;
    bookId:String;
    userId:String;
    issueDate:Date;
    returnDate:Date;
    totalRent:Number;
}

const transactionSchema = new mongoose.Schema<ITransaction>({
    transactionId: { type: String, required: true, unique: true },
    bookId: { type: mongoose.Schema.Types.String, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    totalRent: { type: Number }
});

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;