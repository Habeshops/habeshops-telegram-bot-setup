import express from "express";
import { authenticateUser, checkUser, isBanned } from "../controllers";

const router = express.Router();

router.post("/authenticate", authenticateUser);

module.exports = router;