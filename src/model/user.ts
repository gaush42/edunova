import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
    userId: string;
    name: string;
    email: string;
}

const userSchema = new mongoose.Schema<IUser>({
    userId:{type:String, required:true, unique:true},
    email: { type: String, required: true, unique:true },
    name: { type: String, required: true }
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;