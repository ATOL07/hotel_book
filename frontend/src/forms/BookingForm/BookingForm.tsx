import { useForm } from "react-hook-form";
import { UserType } from "../../../../backend/src/shared/types"

type Props = {
    currentUser: UserType;
}


type BookingFormData={
    firstName:string;
    lastName:string;
    email:string;
}

const BookingForm = ({ currentUser }: Props)=>{
    const { handleSubmit,register } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            // adultCount: search.adultCount,
            // childCount: search.childCount,
            // checkIn: search.checkIn.toISOString(),
            // checkOut: search.checkOut.toISOString(),
            // hotelId: hotelId,
            // totalCost: paymentIntent.totalCost,
            // paymentIntentId: paymentIntent.paymentIntentId,
          },
    });

    return(
        <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
            <span className="text-3xl font-bold">Confirm Your Details</span>
            <div className="gird grid-cols-2 gap-6">
            <label className="text-gray-700 text-sm font-bold flex-1">
                First Name
                <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type ="text"
                readOnly
                disabled
                {...register("firstName")}
                />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name
                <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type ="text"
                readOnly
                disabled
                {...register("lastName")}
                />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type ="text"
                readOnly
                disabled
                {...register("email")}
                />
            </label>
          </div> 
        </form>
    )


}

export default BookingForm