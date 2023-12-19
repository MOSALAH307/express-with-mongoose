import express from "express";
import initiateApp from "./src/app.js";
const app = express();
const port = 3000;

initiateApp(app, express);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
