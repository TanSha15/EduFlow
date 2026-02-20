import { Flame } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const StreakCard = () => {
  const { user } = useAuth();

  return (
    <div className="relative group overflow-hidden bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-4 px-6 rounded-2xl flex items-center gap-4 shadow-xl shadow-orange-500/5 transition-all duration-300 hover:border-orange-500/30">
      {/* Animated background glow */}
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-600/10 rounded-full blur-2xl group-hover:bg-orange-600/20 transition-colors" />

      {/* Icon Container */}
      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 shadow-inner">
        <Flame size={24} className="animate-pulse" fill="currentColor" fillOpacity={0.2} />
      </div>

      {/* Text Content */}
      <div className="relative">
        <h4 className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-500">
          Learning Streak
        </h4>
        <p className="text-2xl font-black text-white flex items-baseline gap-1">
          {user?.streak || 0}
          <span className="text-xs font-medium text-slate-400">Days</span>
        </p>
      </div>

      {/* Decorative Progress Indicator (Subtle) */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500" 
           style={{ width: user?.streak > 0 ? '100%' : '0%' }} 
      />
    </div>
  );
};

export default StreakCard;