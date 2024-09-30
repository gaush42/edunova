import express from 'express'
import connectDB from './config/db.config';
import router from './routes/routes'
const app = express();
app.use(express.json());

connectDB();
// Routes
app.use('/api', router);

export default app