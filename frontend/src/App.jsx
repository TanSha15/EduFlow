import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

// Components & Pages
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function App() {
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle for mobile menu
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // Function to close sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  // 1. Full-screen Dark Loading State
  if (isCheckingAuth) {
    return (
      <div className="h-screen w-full bg-[#0f172a] flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-indigo-400 font-medium animate-pulse">Loading EduFlow...</h2>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* 2. Root Container: Edge-to-edge dark background */}
      <div className="min-h-screen w-full bg-[#0f172a] flex flex-col overflow-x-hidden m-0 p-0 text-slate-200">
        
        {/* Navbar: Only fixed/sticky if needed, otherwise stays in flow */}
        {isAuthenticated && (
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        )}

        {/* 3. Layout Wrapper: Flex container for Sidebar + Main */}
        <div className="flex flex-1 w-full relative">
          
          {/* Sidebar */}
          {isAuthenticated && (
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
          )}

          {/* 4. Main Area: Controlled margin to prevent shrinking/overlapping */}
          <main 
            className={`flex-1 w-full transition-all duration-300 ease-in-out ${
              isAuthenticated && isSidebarOpen && window.innerWidth > 768 
                ? "md:ml-[240px]" 
                : "ml-0"
            }`}
          >
            {/* 5. Content Container: Prevents the "ugly" squeezed look on large screens */}
            <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-full">
              <Routes>
                <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>

      {/* Themed Toaster for Dark Mode */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
            borderRadius: '12px'
          }
        }} 
      />
    </BrowserRouter>
  );
}

export default App;