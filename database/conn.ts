import mongoose, { Connection } from 'mongoose';

const connectMongo = async (): Promise<boolean | undefined> => {
  try {
    mongoose.set('strictQuery', false);
    const { connection }: { connection: Connection } = await mongoose.connect(
      process.env.MONGO_URL || '',
    );

    console.log(connectMongo);

    if (connection.readyState === 1) {
      console.log('MongoDB Connected Successfully');
      return true;
    }
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return undefined;
  }

  console.log(connectMongo);
  return undefined;
};

export default connectMongo;
