import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Rocket, Sparkles } from "lucide-react";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Your backend now automatically sets the cookie upon signup
            await signup(name, email, password);
            console.log("Success! Account created and logged in.");
        } catch (error) {
            console.error("Signup failed:", error);
            alert(error || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 md:p-8">
            {/* Main Container */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row-reverse bg-slate-800/30 border border-slate-700/50 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl shadow-indigo-500/10 animate-in fade-in zoom-in-95 duration-700">
                
                {/* Right Side (Visual Branding) */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600/20 via-indigo-900/40 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                    
                    <div className="relative text-center space-y-6">
                        <div className="inline-block p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 shadow-inner">
                            <Rocket size={80} className="text-indigo-400" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-white">Join the Flow</h2>
                            <p className="text-slate-400 max-w-xs mx-auto">
                                Start your journey and master any topic with AI-generated roadmaps and quizzes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Left Side (Signup Form) */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-slate-900/20">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                            <UserPlus className="text-indigo-400" size={28} />
                            Create Account
                        </h1>
                        <p className="text-slate-500 mt-2">Sign up to start building your personal library.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Your Name.." 
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input 
                                    type="password" 
                                    placeholder="Min. 6 characters" 
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={`w-full py-3 mt-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                                isLoading 
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-[0.98]'
                            }`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Get Started</span>
                                    <Sparkles size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                        <p className="text-slate-500 text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;