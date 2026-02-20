import { useAuth } from "../context/AuthContext";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-[1100] w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-700/50 px-4 md:px-8 py-3 flex justify-between items-center transition-all duration-300">
            {/* Left Side: Toggle & Brand */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleSidebar} 
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors duration-200 focus:outline-none"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-1.5 bg-indigo-600/20 rounded-lg text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <Sparkles size={20} />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:block">
                        EduFlow
                    </h2>
                </div>
            </div>
            
            {/* Right Side: User Profile Info */}
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-200">{user?.name}</span>
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">
                        {user?.role || "Student"}
                    </span>
                </div>
                
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex justify-center items-center font-bold border-2 border-slate-700 shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform cursor-pointer">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
};

export default Navbar;