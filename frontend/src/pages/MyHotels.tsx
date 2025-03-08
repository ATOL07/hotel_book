
import { useQuery } from "react-query";
import * as apiClient from "../api-client"; // Update with your actual api-client file path
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import DeleteHotel from "./DeleteHotel";

const MyHotels = () => {
  // Fetch hotels
  const { data: hotelData, isLoading } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
    onError: () => {
      console.error("Failed to fetch hotels.");
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!hotelData || hotelData.length === 0) {
    return <span>No Hotels Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div key={hotel._id} className="flex flex-col border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 items-center">
                <BiMoney className="mr-1" />
                <b>&#2547;</b>{hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end gap-2">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
              <DeleteHotel
                hotelId={hotel._id}
                onDeleteSuccess={() => {
                  console.log(`Hotel ${hotel._id} deleted successfully.`);
                }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;

