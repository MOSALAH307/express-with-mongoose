import mongoose from "mongoose";

const connection = async () => {
  return await mongoose
    .connect("mongodb://127.0.0.1:27017/assignment6")
    .then(() => {
      console.log("connected to DB");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connection;
