import userModel from "../../../DB/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import productModel from "../../../DB/models/productModel.js";

//==============================
//getAllUsers
//==============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select({ password: 0, __v: 0 });
    return res.json({ msg: "done", users });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//get all user products
//==============================
export const userProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ msg: "invalid id" });
    }
    const products = await productModel
      .find({ userId: id })
      .populate("userId", "username -_id");
    return res.json(products);
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//search where name contains x & age < y
//==============================
export const nameContainsLetterAngAgeLess = async (req, res) => {
  try {
    const { letter, ageLess } = req.query;
    const users = await userModel
      .find({ username: { $regex: letter }, age: { $lt: ageLess } })
      .select({ password: 0, __v: 0 });
    return res.json(users);
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//search where age between x & y
//==============================
export const ageBetween = async (req, res) => {
  try {
    const { age1, age2 } = req.query;
    const users = await userModel
      .find({ age: { $lt: age2, $gt: age1 } })
      .select({ password: 0, __v: 0 });
    return res.json(users);
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//sign up
//==============================
export const signup = async (req, res) => {
  try {
    const { username, email, password, age, gender, phone } = req.body;
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.json({ msg: "email already exisits" });
    }
    const hash = bcrypt.hashSync(password, 8);
    const user = await userModel.create({
      username,
      email,
      password: hash,
      age,
      gender,
      phone,
    });
    return res.json({ msg: "user added successfully" });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//sign in
//==============================
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await userModel.findOne({ email });
    if (!isExist) {
      return res.json({ msg: "wrong credentials" });
    }
    const isValid = bcrypt.compareSync(password, isExist.password);
    const token = jwt.sign({ _id: isExist._id, email: isExist.email }, "GGMU", {
      expiresIn: 60 * 60,
    });
    return isValid
      ? res.json({ mgs: "logged in successfully", token })
      : res.json({ msg: "wrong credentials" });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//update (password)
//==============================
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    //check id user exists or not
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ msg: "invalid id" });
    }
    //check if entered password is same as the old one or not
    const samePass = bcrypt.compareSync(password, user.password);
    if (samePass) {
      return res.json({
        msg: "This is the same password, please enter a new password",
      });
    }
    //hashing new password
    const hash = bcrypt.hashSync(password, 8);
    const updatedUser = await userModel.updateOne(
      { _id: id },
      { password: hash }
    );
    return res.json({ msg: "password updated successfully", updatedUser });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//delete
//==============================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser
      ? res.json({ msg: "user deleted" })
      : res.json({ msg: "invalid id" });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
