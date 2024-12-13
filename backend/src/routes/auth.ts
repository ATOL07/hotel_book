

// import express, { Request, Response } from "express";
// import { check, validationResult } from "express-validator";
// import User from "../models/user";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";



// const router = express.Router();


// router.post("/login",  
//     [
//           check("firstName", "First Name is required").isString(),
//           check("lastName", "Last Name is required").isString(),
//           check("email", "Email is required").isEmail(),
//           check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
//         ],
//  async (req: Request, res: Response): Promise<void> => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//        res.status(400).json({ message: errors.array() });
//     }

//     const { email, password } = req.body;

//     try{
//         const user = await User.findOne({ email });

//         if (!user) {
//             res.status(400).json({ message: "Invalid Credentials" });
//         }

//         const isMatch = await bcrypt.compare(password, user?.password);

//         if (!isMatch) { 
//             res.status(400).json({ message: "Invalid Credentials" });
//         }

//         const token = jwt.sign(
//             { userId: user?.id },
//             process.env.JWT_SECRET_KEY as string,
//             {
//                 expiresIn: "1d", // Set expiration time to 1 day
//             }
//         );

//         res.cookie("auth_token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             maxAge: 86400000,
//         });

//         res.status(200).json({ userId: user?._id})

//     } catch (error){
//         console.log(error)
//         res.status(500).json({ message: "Something went wrong" });
//     }

// });


// export default router;


import express, { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
    "/login",
    [
        // check("firstName", "First Name is required").isString(),
        // check("lastName", "Last Name is required").isString(),
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    ],
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors.array() });
            return;
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user ) {
                res.status(400).json({ message: "Invalid User" });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                res.status(400).json({ message: "Invalid Credentials" });
                return;
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: "1d", // Set expiration time to 1 day
                }
            );

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000,
            });

            res.status(200).json({ userId: user._id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

router.get("/validate-token",  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
    res.status(200).send({userId: req.userId});
});

export default router;
