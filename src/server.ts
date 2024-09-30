import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server  // Export the server instance