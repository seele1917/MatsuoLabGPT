import mongoose from "mongoose";

const ConnectDB = async (): Promise<void> => {
  try {
    const dbApiKey: string = process.env.DB_API_KEY || "";
    await mongoose.connect(dbApiKey);
    console.log("Success: Connected to MongoDB");
  } catch (err) {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

export default ConnectDB;