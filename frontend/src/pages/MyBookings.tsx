

import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { SetStateAction, useState } from "react";

const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(hotels.length / itemsPerPage);

  // Get the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = hotels.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  // Handle previous page
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // Prevent going below page 1
  };

  // Handle next page
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages)); // Prevent going above total pages
  };

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {currentHotels.map((hotel) => (
        <div
          key={hotel._id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
        >
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center"
              alt={hotel.name}
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            {hotel.bookings.map((booking) => (
              <div key={booking._id}>
                <div>
                  <span className="font-bold mr-2">Dates: </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -{" "}
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Guests:</span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                    {booking.firstName && (
                      <b>
                        <span>
                          {" "}
                          <br />
                          Booked By - {booking.firstName} {booking.lastName}
                        </span>
                      </b>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-5">
        <button
          onClick={handlePrevious}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyBookings;
