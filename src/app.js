import connection from "./DB/connection.js";
import productRouter from "./modules/product/router/product.router.js";
import userRouter from "./modules/user/router/user.router.js";

const initiateApp = (app, express) => {
  connection();
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("*", (req, res) => {
    return res.json({ msg: "catch error in routing" });
  });
};

export default initiateApp;
