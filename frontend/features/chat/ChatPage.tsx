"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessage, MessageType } from './ChatMessage';
import { sendChatMessage } from './api';

export default function ChatPage() {
    const [messages, setMessages] = useState<MessageType[]>([
        {
            role: 'ai',
            content: {
                summary: "Namaste! I am NyayaSetu AI, your personal legal assistant. How can I help you today with your legal questions?",
                legal_basis: "",
                steps: [],
                documents_required: [],
                confidence_score: 1.0
            }
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (text: string) => {
        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsLoading(true);

        try {
            // We will actually call our own api.ts function which simulates or hits the local endpoint
            const response = await sendChatMessage(text);
            setMessages(prev => [...prev, { role: 'ai', content: response }]);
        } catch (error) {
            console.error("Chat Error:", error);
            // Handled primarily inside sendChatMessage, but fallback here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans">
            {/* Header */}
            <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.6)] z-10 sticky top-0">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl shadow-[0_4px_10px_rgba(255,255,255,0.1)]">
                        ⚖️
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 leading-tight">NyayaSetu AI</h1>
                        <p className="text-sm text-slate-500 font-medium tracking-wide">Core Legal Chat</p>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto w-full">
                <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-2">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex w-full mb-4 justify-start">
                            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl rounded-bl-none px-6 py-5 shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(148,163,184,0.5)]"></div>
                                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(148,163,184,0.5)]" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(148,163,184,0.5)]" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area */}
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>
    );
}
