import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import axios from "axios";

interface User {
  username: string;
  first_name: string;
  last_name: string;
  language_code: string;
  password: string;
  timezone: string;
  signup_source: string;
}

const BACKEND_URL = process.env.BACKEND_URL;

/**
 * Register a new user in the Django backend.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user: User = req.body;

    if (!user.username || !user.password) {
      res.status(400).json({
        error: "Username and password are required fields.",
      });
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/users/`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error(
        "Error while registering user:",
        error.response?.data || error.message
      );

      if (error.response) {
        res.status(error.response.status).json(error.response.data);
        return;
      }

      res.status(500).json({
        error: "An unexpected error occurred while registering the user.",
      });
    }
  }
);
