import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    // const { connection } = await mongoose.connect(process.env.MONGO_URI);

    console.log(connectMongo);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
  console.log(connectMongo);
};

export default connectMongo;
