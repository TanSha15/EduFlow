import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Zap, Shield, Flame, Sparkles } from 'lucide-react';

const FAQItem = ({ question, answer, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-700/50 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
            <Icon size={20} />
          </div>
          <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
            {question}
          </span>
        </div>
        {isOpen ? <ChevronUp className="text-indigo-400" /> : <ChevronDown className="text-slate-500" />}
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 leading-relaxed pl-14">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI generate study material?",
      answer: "We use Google Gemini 1.5 Flash to process your topic and structure it into academic summaries, roadmaps, or quizzes based on your selection.",
      icon: Sparkles
    },
    {
      question: "Why do I see 'Authentication Required'?",
      answer: "This happens if your session expires. Simply log out and log back in to refresh your secure HTTP-only cookies and continue generating content.",
      icon: Shield
    },
    {
      question: "How is my study streak calculated?",
      answer: "Your streak increases if you generate content within 24 to 48 hours of your last activity. If you wait longer than 48 hours, the streak resets to 1.",
      icon: Flame
    },
    {
      question: "Can I delete my study history?",
      answer: "Yes, you can delete individual items using the trash icon in the sidebar or use the 'Clear History' button to wipe your entire library.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 mb-6 shadow-xl shadow-indigo-500/10">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-400">Everything you need to know about mastering topics with EduFlow.</p>
        </div>

        {/* FAQ List */}
        <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-3xl p-2 md:p-8 shadow-2xl">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>

        {/* Footer Support */}
        <div className="mt-12 text-center">
          <p className="text-slate-500">
            Still have questions? Reach out to our academic support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;