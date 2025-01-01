import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn, isAdmin } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        {/* Website Logo */}
        <span className="text-4xl font-extrabold text-gray-900 tracking-wide">
          <Link
            to="/"
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text hover:text-white transition-colors duration-300 ease-in-out"
          >
            BookYourHolidays.com
          </Link>
        </span>

        {/* Navigation Links */}
        <span className="flex space-x-2 items-center">
          {isLoggedIn ? (
            <>
              {/* My Bookings - Visible to all logged-in users */}
              <Link
                className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-bounceText text-glow px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>

              {/* My Hotels - Visible only to admins */}
              {isAdmin && (
                <Link
                  className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-bounceText text-glow px-3 font-bold hover:bg-blue-600"
                  to="/my-hotels"
                >
                  My Hotels
                </Link>
              )}

              {/* Sign Out Button */}
              <SignOutButton />
            </>
          ) : (
            // Sign-In Link for non-logged-in users
            <Link
              to="/sign-in"
              className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-bounceText text-glow bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
