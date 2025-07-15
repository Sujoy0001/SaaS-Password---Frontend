import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsCard from "../components/StatsCard";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
        <main className="max-w-7xl mx-auto flex-grow mt-16">
            <Outlet />
            <StatsCard />
        </main>
      <Footer />
    </div>
  );
}
