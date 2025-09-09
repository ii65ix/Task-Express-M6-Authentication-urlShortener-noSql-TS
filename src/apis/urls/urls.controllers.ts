import Url from "../../models/Url";
import shortid from "shortid";
import User from "../../models/User";
import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
const baseUrl = "http://localhost:8000/api/urls";
export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next({
        status: 401,
        message: "no auth headers",
      });
    }
    const [schema, token] = authHeader.split(" ");
    if (schema !== "Bearer" && !token) {
      return next({ status: 401, message: "invalid authentication scheme" });
    }
    console.log(token);
    
    const decodedtoken: any = jwt.verify(
      token,
      process.env.JWT_SECEERT || "something secert",
    );

    const user = await User.findOne({ username: decodedtoken.username });
    if (!user) {
      return next({ status: 401, message: "invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {}
};
export const shorten = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const urlCode = shortid.generate();
  try {
    req.body.shortUrl = `${baseUrl}/${urlCode}`;
    req.body.urlCode = urlCode;
    req.body.userId = req.params.userId;
    const newUrl = await Url.create(req.body);

    await User.findByIdAndUpdate(req.params.userId, {
      $push: { urls: newUrl._id },
    });

    res.json(newUrl);
  } catch (err) {
    next(err);
  }
};

export const redirect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      res.redirect(url.longUrl || "");
    } else {
      res.status(404).json("No URL Found");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      await Url.findByIdAndDelete(url._id);
      res.status(201).json("Deleted");
    } else {
      res.status(404).json("No URL Found");
    }
  } catch (err) {
    next(err);
  }
};
