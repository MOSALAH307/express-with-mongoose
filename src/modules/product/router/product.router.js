import { Router } from "express";
import {
  addProduct,
  allProductsWithOwners,
  getAllProducts,
  productSortedDesc,
  updateProduct,
  deleteProduct
} from "../controller/product.controller.js";

const productRouter = Router();

//===============================
//product end points
//===============================

productRouter.get("/", getAllProducts);

productRouter.get("/withOwners", allProductsWithOwners);

productRouter.get("/sortDescByDate", productSortedDesc);

productRouter.post("/addProduct", addProduct);

productRouter.patch("/updateProduct/:id", updateProduct);

productRouter.delete("/deleteProduct/:id", deleteProduct);

export default productRouter;
