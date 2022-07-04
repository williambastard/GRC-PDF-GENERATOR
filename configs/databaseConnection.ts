import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'

mongoose.Promise = global.Promise;
dotenv.config();

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env;

const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
};
export { connectToDatabase };
