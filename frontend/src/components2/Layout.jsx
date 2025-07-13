import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsCard from "../components/StatsCard";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex flex-1 flex-col md:flex-row justify-between w-full max-w-7xl mx-auto px-6 py-10">
        {/* Main Outlet Content */}
        <div className="flex-1 md:pr-10">
          <Outlet />
        </div>

        {/* Divider Line */}
        <div className="hidden md:block w-px bg-gray-700"></div>

        {/* StatsCard Sidebar */}
        <div className="mt-10 md:mt-0 md:w-1/3 md:pl-10">
          <StatsCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
