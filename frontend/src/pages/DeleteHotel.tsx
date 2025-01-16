
import {  useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"; // Update with your actual api-client file path
import { useAppContext } from "../contexts/AppContext"; // Assuming you have this context

const DeleteHotel = ({ hotelId, onDeleteSuccess }: { hotelId: string, onDeleteSuccess: () => void }) => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(apiClient.deleteMyHotelById, {
    onSuccess: async () => {
      showToast({ message: "Hotel Deleted!", type: "SUCCESS" });
      await queryClient.invalidateQueries("fetchMyHotels")
      onDeleteSuccess(); // Callback for successful deletion
    },
    onError: (error) => {
      showToast({ message: `Error Deleting Hotel: ${(error as any)?.message || "Unknown Error"}`, type: "ERROR" });
    },
  });

  const handleDelete = () => {
    if (!hotelId) {
      showToast({ message: "Invalid Hotel ID", type: "ERROR" });
      return;
    }
    mutate(hotelId);
  };

  return (
    <div>
      <button 
        onClick={handleDelete} 
        disabled={isLoading} 
        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-500"
      >
        {isLoading ? "Deleting..." : "Delete Hotel"}
      </button>
    </div>
  );
};

export default DeleteHotel;
