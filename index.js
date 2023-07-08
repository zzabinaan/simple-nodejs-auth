import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import router from "./routes/api.js";
import Users from "./models/UserModel.js";
import Movies from "./models/MovieModel.js";

dotenv.config();
const app = express();

try {
  await db.authenticate;
  console.log(`Database connected`);
  // await Users.sync();
  // await Movies.sync();

  // await Users.sync({ alter: true }); --use this if you want to add new coloumn at existed userModel
} catch (error) {
  console.log(error);
}

app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(3000, () => console.log(`Server running at port 3000`));
