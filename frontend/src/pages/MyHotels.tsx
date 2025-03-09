

import { useQuery } from "react-query";
import * as apiClient from "../api-client"; // Update with your actual api-client file path
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import DeleteHotel from "./DeleteHotel";
import { SetStateAction, useState } from "react";

const MyHotels = () => {
  // Fetch hotels
  const { data: hotelData, isLoading } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
    onError: () => {
      console.error("Failed to fetch hotels.");
    },
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 5; // Number of hotels per page

  if (isLoading) {
    return <span className="text-xl font-semibold text-gray-700">Loading...</span>;
  }

  if (!hotelData || hotelData.length === 0) {
    return <span className="text-xl font-semibold text-gray-700">No Hotels Found</span>;
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(hotelData.length / hotelsPerPage);

  // Get current hotels to display
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotelData.slice(indexOfFirstHotel, indexOfLastHotel);

  // Handle page change
  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Hotels</h1>
          <Link
            to="/add-hotel"
            className="flex items-center bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Hotel
          </Link>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 gap-8">
          {currentHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="flex flex-col border border-slate-300 rounded-lg p-8 gap-5 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Hotel Name and Description */}
              <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
              <p className="text-gray-600 whitespace-pre-line">{hotel.description}</p>

              {/* Hotel Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="flex items-center border border-slate-300 rounded-sm p-3">
                  <BsMap className="mr-2 text-blue-600" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="flex items-center border border-slate-300 rounded-sm p-3">
                  <BsBuilding className="mr-2 text-blue-600" />
                  {hotel.type}
                </div>
                <div className="flex items-center border border-slate-300 rounded-sm p-3">
                  <BiMoney className="mr-2 text-blue-600" />
                  <b>&#2547;</b>{hotel.pricePerNight} per night
                </div>
                <div className="flex items-center border border-slate-300 rounded-sm p-3">
                  <BiHotel className="mr-2 text-blue-600" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="flex items-center border border-slate-300 rounded-sm p-3">
                  <BiStar className="mr-2 text-blue-600" />
                  {hotel.starRating} Star Rating
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="flex items-center bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  View Details
                </Link>
                <DeleteHotel
                  hotelId={hotel._id}
                  onDeleteSuccess={() => {
                    console.log(`Hotel ${hotel._id} deleted successfully.`);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 text-sm font-medium border border-gray-300 ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MyHotels;