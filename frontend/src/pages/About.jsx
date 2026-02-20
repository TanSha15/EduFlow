import React from 'react';
import { BookOpen, Cpu, Shield, Zap, Rocket, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        
        {/* --- Header Section --- */}
        <header className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <Zap size={14} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent mb-6">
            About EduFlow
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your intelligent companion for mastering complex topics through the power of 
            artificial intelligence and structured learning.
          </p>
        </header>

        {/* --- Mission Section --- */}
        <section className="mb-20">
          <div className="relative group p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-colors duration-500" />
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="p-4 rounded-2xl bg-indigo-600/20 text-indigo-400">
                <Rocket size={40} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  EduFlow was designed to bridge the gap between vast academic resources and 
                  effective learning. By utilizing the <span className="text-indigo-400 font-semibold">MERN stack</span> and 
                  <span className="text-indigo-400 font-semibold"> Google Gemini AI</span>, we provide a platform that generates 
                  structured study materials, roadmaps, and quizzes in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Core Technology Grid --- */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Core Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Gemini AI Card */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Engine</h3>
              <p className="text-slate-400">
                We use state-of-the-art natural language processing to detect context and generate 
                personalized study recommendations tailored to your goals.
              </p>
            </div>

            {/* MERN Architecture Card */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">MERN Architecture</h3>
              <p className="text-slate-400">
                Built with MongoDB, Express, React, and Node.js to ensure high performance 
                and a scalable, ultra-fast full-stack experience.
              </p>
            </div>

            {/* Secure Auth Card */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure Authentication</h3>
              <p className="text-slate-400">
                A custom-built authentication system with email verification and password reset 
                features to keep your educational data safe.
              </p>
            </div>

            {/* Study History Card */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Knowledge Library</h3>
              <p className="text-slate-400">
                All your generated materials are stored in the cloud, allowing you to build 
                a personal library of knowledge that grows with you.
              </p>
            </div>

          </div>
        </section>

        {/* --- Streak / Gamification Section --- */}
        <section className="relative p-1 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-2xl shadow-indigo-500/20">
          <div className="bg-[#0f172a] rounded-[calc(1.5rem-1px)] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <GraduationCap size={200} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">The Learning Streak</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Stay consistent with our built-in streak system. EduFlow tracks your 
                daily activity to help you maintain a productive study habit. 
                Consistency is the key to mastering any subject.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 min-w-[160px]">
              <div className="text-4xl font-black text-indigo-400 mb-1">🔥</div>
              <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Daily Streak</div>
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="mt-20 pt-10 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© 2026 EduFlow AI Learning Platform. Built with passion for students everywhere.</p>
        </footer>

      </div>
    </div>
  );
};

export default About;