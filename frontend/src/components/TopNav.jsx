import { FiBell } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40/333333/FFFFFF?text=DB"
              alt="Logo"
              className="h-8 w-8 mr-2 rounded"
            />
            <span className="text-xl font-bold text-white">DarkBrand</span>
          </div>

          {/* Right side - Navigation items */}
          <div className="flex items-center gap-4">
            {/* Notification button */}
            <button className="relative p-1 rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <FiBell className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                3
              </span>
            </button>

            {/* User profile */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button className="flex items-center focus:outline-none group">
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <HiOutlineUserCircle className="h-6 w-6 text-gray-300 group-hover:text-white" />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-300 group-hover:text-white hidden md:inline">
                    John Doe
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;