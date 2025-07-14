import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsCard from "../components/StatsCard";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
        <main className="max-w-6xl mx-auto mt-16">
            <Outlet />
            <StatsCard />
        </main>
      <Footer />
    </div>
  );
}
