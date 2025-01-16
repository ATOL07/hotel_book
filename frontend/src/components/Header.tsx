import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn, isAdmin } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Logo */}
        <span className="text-4xl font-extrabold tracking-wide">
          <Link
            to="/"
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text hover:text-white transition-colors duration-300 ease-in-out font-sans"
          >
            BookYourHolidays.com
          </Link>
        </span>

        {/* Navigation Links */}
        <span className="flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              {/* My Bookings - Visible to all logged-in users */}
              <Link
                to="/my-bookings"
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-3 py-2 text-lg font-sans font-bold hover:text-white transition-colors duration-300"
              >
                My Bookings
              </Link>

              {/* My Hotels - Visible only to admins */}
              {isAdmin && (
                <Link
                  to="/my-hotels"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-3 py-2 text-lg font-sans font-bold hover:text-white transition-colors duration-300"
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
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-3 py-2 text-lg font-sans font-bold hover:text-white transition-colors duration-300"
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
