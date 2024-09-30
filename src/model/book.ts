import mongoose, { Document, Model } from 'mongoose';

interface IBook extends Document {
    bookId:String;
    bookName:String;
    category:String;
    rentPerDay:Number;
}

const bookSchema = new mongoose.Schema<IBook>({
    bookId: {type: String, required: true, unique: true},
    bookName: { type: String, required: true },
    category: { type: String, required: true },
    rentPerDay: { type: Number, required: true }
});

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export default Book;