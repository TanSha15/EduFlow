import { useState, useEffect } from "react";
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

// Protected Route Wrapper for cleaner code
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Wrapper (Prevents logged-in users from seeing Login/Signup)
const PublicRoute = ({ children, isAuthenticated }) => {
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

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
      <div className="min-h-screen w-full bg-[#0f172a] flex flex-col text-slate-200 overflow-x-hidden">
        
        {isAuthenticated && (
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        )}

        <div className="flex flex-1 w-full relative">
          {isAuthenticated && (
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
          )}

          <main 
            className={`flex-1 w-full transition-all duration-300 ease-in-out ${
              isAuthenticated && isSidebarOpen ? "lg:pl-[240px]" : "pl-0"
            }`}
          >
            <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-full">
              <Routes>
                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Contact /></ProtectedRoute>} />
                
                {/* Semi-Protected / Public */}
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />

                {/* Auth Routes */}
                <Route path="/signup" element={<PublicRoute isAuthenticated={isAuthenticated}><Signup /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute isAuthenticated={isAuthenticated}><Login /></PublicRoute>} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>

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