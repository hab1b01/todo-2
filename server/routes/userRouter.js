import pool from "../helpers/db.js";
import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { postLogin, postRegisteration } from "../controllers/userController.js";
const router = Router();
const { sign } = jwt;

// router.post("/register", (req, res, next) => {
//   hash(req.body.password, 10, (err, hashedPassword) => {
//     if (err) {
//       return next(err);
//     }
//     try {
//       pool.query(
//         "insert into account(email, password) values($1, $2) returning *",
//         [req.body.email, hashedPassword],
//         (error, result) => {
//           if (error) {
//             return next(error);
//           }
//           return res.status(201).json({
//             id: result.rows[0].id,
//             email: result.rows[0].email,
//           });
//         }
//       );
//     } catch (error) {
//       return next(error);
//     }
//   });
// });

// router.post("/login", (req, res, next) => {
//   const invalidMessage = "Invalid email or password";
//   try {
//     pool.query(
//       "select * from account where email = $1",
//       [req.body.email],
//       (error, result) => {
//         if (error) {
//           return next(error);
//         }
//         if (result.rowCount === 0) {
//           return next(new Error("Invalid email or password"));
//         }
//         const password = result.rows[0].password;
//         compare(req.body.password, password, (err, match) => {
//           if (err) {
//             return next(err);
//           }
//           if (!match) {
//             return res.status(401).json({ error: invalidMessage });
//           }
//           const token = sign(
//             { id: result.rows[0].id },
//             process.env.JWT_SECRET_KEY
//           );
//           return res.status(200).json({
//             id: result.rows[0].id,
//             email: result.rows[0].email,
//             token: token,
//           });
//         });
//       }
//     );
//   } catch (error) {
//     return next(error);
//   }
// });
router.post("/register", postRegisteration);
router.post("/login", postLogin);
export default router;
