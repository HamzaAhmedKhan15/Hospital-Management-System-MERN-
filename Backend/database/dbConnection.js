import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI, {
      dbName: "MY_HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("Connected to my Database!");
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};
