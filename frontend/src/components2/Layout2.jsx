import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer2";

export default function Layout2() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <TopNav />
      
      {/* Secondary Navigation Bar */}
      <Navbar2 />
      
      {/* Main Content Area - flex-grow takes remaining space */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}