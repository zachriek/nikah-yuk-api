import mongoose from 'mongoose';

const dbConnect = () => {
  mongoose.connect(`${process.env.MONGO_URI}`);
  mongoose.connection.on('connected', () => console.log('Database connected successfully'));
  mongoose.connection.on('error', (err) => console.log(`Error while connecting to database : ${err}`));
  mongoose.connection.on('disconnected', () => console.log('Database connection disabled'));
};

export default dbConnect;
