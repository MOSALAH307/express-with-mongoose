import productModel from "../../../DB/models/productModel.js";
import userModel from "../../../DB/models/userModel.js";

//==============================
//getAllProducts
//==============================
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    return res.json({ msg: "done", products });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//getAllProducts with owners
//==============================
export const allProductsWithOwners = async (req, res) => {
  try {
    const products = await productModel.find().populate("userId", "username");
    return res.json({ msg: "done", products });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//getAllProducts desc by created at
//==============================
export const productSortedDesc = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    return res.json({ msg: "done", products });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//add product
//==============================
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ msg: "invalid userId" });
    }
    const product = await productModel.create({
      name,
      description,
      price,
      userId,
    });
    return res.json({ msg: "produst added successfully", product });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//update product
//==============================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const { price } = req.body;
    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id, userId },
      { price },
      { new: true }
    );
    return updatedProduct
      ? res.json({ msg: "product updated" })
      : res.json({ msg: "invalid id or userId" });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//delete product
//==============================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const deletedProduct = await productModel.findOneAndDelete({
      _id: id,
      userId,
    });
    return deletedProduct
      ? res.json({ msg: "product deleted" })
      : res.json({ msg: "invalid id or userId" });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
