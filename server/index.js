import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todoRouter from "./routes/todoRouter.js";
import userRouter from "./routes/userRouter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  //send the error details to client
  res.status(statusCode).json({
    error: err.message,
  });
});
app.use("/", todoRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
