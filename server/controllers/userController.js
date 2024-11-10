import { hash, compare } from "bcrypt";
import { insertUser, selectUserByEmail } from "../models/user.js";
import { ApiError } from "../helpers/apiError.js";
import jwt from "jsonwebtoken";

const { sign } = jwt;
const postRegisteration = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.email.length === 0)
      return next(new ApiError("Invalid email for user", 400));
    if (!req.body.password || req.body.password.length < 8) {
      res.status(400).json({ error: "Invalid password for user" });
    }
    const { email, password } = req.body;

    const hashedPassword = await hash(password, 10);
    const userFromDb = await insertUser(email, hashedPassword);
    const user = userFromDb.rows[0];

    return res.status(201).json(createUserObject(user.id, user.email));
  } catch (error) {
    return next(error);
  }
};

const createUserObject = (id, email, token = undefined) => {
  return {
    id: id,
    email: email,
    token: token,
  };
};

const postLogin = async (req, res, next) => {
  const invalid_credential_message = "Invalid credentials";
  try {
    const userFromDb = await selectUserByEmail(req.body.email);
    if (userFromDb.rowCount === 0)
      return next(new ApiError(invalid_credential_message, 400));
    const user = userFromDb.rows[0];
    const isPasswordCorrect = await compare(req.body.password, user.password);
    if (!isPasswordCorrect)
      return next(new ApiError(invalid_credential_message, 400));
    const token = sign(req.body.email, process.env.JWT_SECRET_KEY);
    return res.status(200).json(createUserObject(user.id, user.email, token));
  } catch (error) {
    next(error);
  }
};

export { postRegisteration, postLogin };
