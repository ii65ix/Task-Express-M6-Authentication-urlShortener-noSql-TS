// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
// // export interface AuthRequest extends Request {
// //   user?: { userId: string };
// // }

// export const auth = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const token = authHeader.split(" ")[1];
//      try {
//         const payload = jwt.verify(token, "SecretKey");
//         (req as any).user = payload;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Invalid or expired token' });
//     }

//   };
