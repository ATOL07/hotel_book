import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    let hotels;

    if (req.role === "admin") {
      // Admin can view all bookings
      hotels = await Hotel.find({});
    } else {
      // Non-admin users can only view their own bookings
      hotels = await Hotel.find({
        bookings: { $elemMatch: { userId: req.userId } },
      });
    }

    const results = hotels.map((hotel) => {
      let userBookings = hotel.bookings;

      if (req.role !== "admin") {
        // Filter the bookings if the user is not an admin
        userBookings = hotel.bookings.filter(
          (booking) => booking.userId === req.userId
        );
      }

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});



export default router;

