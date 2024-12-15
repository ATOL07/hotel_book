// import express, { Request, Response, RequestHandler } from "express";
// import User from "../models/user";
// import jwt from "jsonwebtoken";
// import { check, validationResult } from "express-validator";

// const router = express.Router();

// router.post(
//     "/register",
//     [
//       check("firstName", "First Name is required").isString(),
//       check("lastName", "Last Name is required").isString(),
//       check("email", "Email is required").isEmail(),
//       check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
//     ],
//    async (req: Request, res: Response): Promise<void> => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//        res.status(400).json({ message: errors.array() });
//     }
//     try {
//         // Check if the user already exists
//         let user = await User.findOne({
//             email: req.body.email,
//         });

//         if (user) {
//             res.status(400).json({ message: "User already exists" });
//         }

//         // Create a new user if not found
//         user = new User(req.body);
//         await user.save();

//         // Generate a JWT token
//         const token = jwt.sign(
//             { userId: user.id },
//             process.env.JWT_SECRET_KEY as string,
//             {
//                 expiresIn: "1d", // Set expiration time to 1 day
//             }
//         );

//         // Send the token as a cookie
//         res.cookie("auth_token", token, {
//             httpOnly: true, // Prevent access to the cookie from JavaScript
//             secure: process.env.NODE_ENV === "production", // Use HTTPS in production
//             maxAge: 86400000, // Cookie expiration (1 day)
//         });

//          res.status(200).send({ message: "User registered OK" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: "Something went wrong" });
//     }
// });

// export default router;



import express, { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
    "/register",
    [
        check("firstName", "First Name is required").isString(),
        check("lastName", "Last Name is required").isString(),
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    ],
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             res.status(400).json({ message: errors.array() });
        }

        const { email, password, firstName, lastName } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ email: email.toLowerCase() });
            if (user) {
                 res.status(400).json({ message: "User already exists" });
            }

            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user if not found
            user = new User({
                firstName,
                lastName,
                email: email.toLowerCase(),
                password: hashedPassword,
            });

            await user.save();

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

            res.status(200).send({ message: "User registered successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Something went wrong" });
        }
    }
);

export default router;


