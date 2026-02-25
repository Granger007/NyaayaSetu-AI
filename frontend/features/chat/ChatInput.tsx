import React, { useState, FormEvent } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSend(input.trim());
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/50 shadow-[0_-8px_30px_rgb(0,0,0,0.6)] z-10 sticky bottom-0">
            <div className="max-w-4xl mx-auto relative flex items-center">
                {/* Mic Button - Visual Only */}
                <button
                    type="button"
                    disabled={isLoading}
                    className="absolute left-3 text-slate-400 hover:text-slate-100 transition-colors bg-slate-900 p-2 rounded-full"
                    title="Voice input coming soon"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    placeholder="Ask your legal question in plain English or Hindi..."
                    className="w-full pl-14 pr-16 py-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 transition-all shadow-[0_4px_20px_rgb(0,0,0,0.3)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.4)] disabled:opacity-50 text-slate-100 placeholder-slate-500"
                />

                {/* Send Button */}
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className={`absolute right-2 p-2 rounded-full transition-all duration-300 ${input.trim() && !isLoading
                        ? 'bg-gradient-to-br from-slate-100 to-slate-300 text-slate-900 hover:from-white hover:to-slate-200 shadow-[0_4px_10px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_15px_rgba(255,255,255,0.2)] hover:-translate-y-0.5'
                        : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                        }`}
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    )}
                </button>
            </div>
        </form >
    );
};
