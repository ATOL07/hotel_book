

import express, { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
    "/login",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    ],
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Find the user in the database
            const user = await User.findOne({ email: email.toLowerCase() });

            if (!user) {
                res.status(400).json({ message: "Invalid Credentials" });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    res.status(400).json({ message: "Invalid Credentials" });
                } else {
                    // Generate a JWT token
                    const token = jwt.sign(
                        { userId: user.id },
                        process.env.JWT_SECRET_KEY as string,
                        {
                            expiresIn: "1d", // Set expiration time to 1 day
                        }
                    );

                    // Send the token as a cookie
                    res.cookie("auth_token", token, {
                        httpOnly: true, // Prevent access to the cookie from JavaScript
                        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                        maxAge: 86400000, // Cookie expiration (1 day)
                    });

                    res.status(200).json({ userId: user._id });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
      expires: new Date(0),
    });
    res.send();
  });

export default router;

