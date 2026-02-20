import { useState, useEffect } from "react";
import { generateContent, getStudyHistory, deleteStudyHistoryItem } from "../api/ai";
import StreakCard from "../components/StreakCard";
import ReactMarkdown from "react-markdown";
import { History, BookOpen, Clock, Trash2, Zap, Sparkles, Eraser } from "lucide-react";
import { toast } from "react-hot-toast";

const Dashboard = () => {
    const [topic, setTopic] = useState("");
    const [type, setType] = useState("summary");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getStudyHistory();
                setHistory(response.data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            }
        };
        fetchHistory();
    }, []);

    const handleGenerate = async () => {
        if (!topic) return toast.error("Please enter a topic");
        setLoading(true);
        try {
            const data = await generateContent(topic, type);
            setResult(data.data.content); 
            setHistory([data.data, ...history]);
            toast.success("Content generated!");
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            toast.error("Error: " + errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this?")) return;
        
        try {
            await deleteStudyHistoryItem(id);
            setHistory(history.filter(item => item._id !== id));
            const deletedItem = history.find(item => item._id === id);
            if (result === deletedItem?.content) setResult("");
            toast.success("Item deleted");
        } catch (error) {
            toast.error("Failed to delete item");
        }
    };

    const handleClearHistory = async () => {
        if (!window.confirm("Clear ALL history? This cannot be undone.")) return;
        
        try {
            // Option A: Loop through and delete (if you don't have a bulk delete API yet)
            await Promise.all(history.map(item => deleteStudyHistoryItem(item._id)));
            setHistory([]);
            setResult("");
            toast.success("History cleared");
        } catch (error) {
            toast.error("Failed to clear history");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
                
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
                            Study Generator
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">Transform topics into structured knowledge with AI.</p>
                    </div>
                    <StreakCard /> 
                </header>

                {/* Input Section */}
                <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-6 shadow-xl shadow-black/20">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input 
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all"
                                placeholder="What would you like to learn today?" 
                                value={topic} 
                                onChange={(e) => setTopic(e.target.value)} 
                            />
                        </div>
                        
                        <select 
                            className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/50"
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="summary">Summary</option>
                            <option value="quiz">Quiz</option>
                            <option value="roadmap">Roadmap</option>
                        </select>

                        <button 
                            onClick={handleGenerate} 
                            disabled={loading}
                            className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                                loading 
                                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                    <span>Generating...</span>
                                </div>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    <span>Generate</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Result Area - Stays on top for mobile (order-1) */}
                    <div className="lg:col-span-3 order-1">
                        {result ? (
                            <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 shadow-inner animate-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-700/50 pb-4">
                                    <Zap size={20} className="text-indigo-400" />
                                    <h3 className="text-xl font-semibold text-white">Study Material</h3>
                                </div>
                                <div className="prose prose-invert prose-indigo max-w-none">
                                    <ReactMarkdown>{result}</ReactMarkdown>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-3xl p-12 md:p-24 text-center text-slate-500 h-full flex flex-col justify-center items-center">
                                <BookOpen size={64} className="mb-4 opacity-10" />
                                <p className="text-lg">Generate content to view it here.</p>
                            </div>
                        )}
                    </div>

                    {/* History Sidebar - Appears below on mobile (order-2) */}
                    <div className="lg:col-span-1 order-2">
                        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-6 h-fit lg:sticky lg:top-8 flex flex-col">
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-700/50 pb-4">
                                <History size={20} className="text-indigo-400" />
                                <h2 className="font-bold text-white tracking-wide">Study History</h2>
                            </div>
                            
                            <div className="space-y-4 max-h-[40vh] lg:max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar flex-grow">
                                {history.length > 0 ? history.map((item) => (
                                    <div 
                                        key={item._id} 
                                        onClick={() => {
                                            setResult(item.content);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="p-4 rounded-2xl border border-slate-700/50 bg-slate-900/30 hover:bg-indigo-500/10 hover:border-indigo-500/30 cursor-pointer transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors text-sm truncate pr-2">
                                                {item.topic}
                                            </p>
                                            <button 
                                                onClick={(e) => handleDelete(e, item._id)}
                                                className="text-slate-600 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
                                            <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                                                {item.type}
                                            </span>
                                            <div className="flex items-center gap-1 text-slate-500">
                                                <Clock size={12} />
                                                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-center text-slate-500 text-sm py-10">History empty.</p>
                                )}
                            </div>

                            {/* Clear History Button */}
                            {history.length > 0 && (
                                <button 
                                    onClick={handleClearHistory}
                                    className="mt-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400/70 hover:text-red-400 hover:bg-red-500/10 py-3 rounded-xl border border-dashed border-slate-700 transition-all"
                                >
                                    <Eraser size={14} />
                                    Clear History
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;