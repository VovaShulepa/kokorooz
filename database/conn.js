import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(process.env.MONGO_URL);

    console.log(connectMongo);

    if (connection.readyState === 1) {
      console.log("MongoDB Connected Successfully");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return Promise.reject(error);
  }
  console.log(connectMongo);
};

export default connectMongo;
