import express from "express";

const router = express.Router();

import { signup, signin, getUsers } from "./users.controllers";
import { authorize } from "../urls/urls.controllers";

router.post("/signup", authorize,signup);
router.post("/signin",authorize, signin);
router.get("/users",authorize, getUsers);

export default router;
