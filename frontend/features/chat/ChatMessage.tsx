import React from 'react';
import { ChatResponse } from './api';
import { ConfidenceBadge } from './ConfidenceBadge';

export type MessageType =
  | { role: 'user'; content: string }
  | { role: 'ai'; content: ChatResponse };

interface ChatMessageProps {
  message: MessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-6 py-5 shadow-[0_8px_30px_rgb(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.6)] ${isUser
          ? 'bg-slate-800 text-slate-100 rounded-br-none border border-slate-700'
          : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none'
          }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content as string}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Header / Logo could go here if needed, but we keep it minimal */}

            {/* Summary */}
            <div>
              <p className="text-slate-200 leading-relaxed font-medium">
                {(message.content as ChatResponse).summary}
              </p>
            </div>

            {/* Legal Basis */}
            {((message.content as ChatResponse).legal_basis && (message.content as ChatResponse).legal_basis !== 'Not available') && (
              <div className="bg-slate-900/50 backdrop-blur-sm border-l-4 border-slate-400 p-4 rounded-r-xl shadow-sm">
                <span className="font-semibold text-slate-300 text-sm block mb-1">Legal Basis:</span>
                <span className="text-slate-400 text-sm">{(message.content as ChatResponse).legal_basis}</span>
              </div>
            )}

            {/* Steps */}
            {((message.content as ChatResponse).steps && (message.content as ChatResponse).steps.length > 0) && (
              <div>
                <span className="font-semibold text-slate-100 text-sm mb-2 block">Actionable Steps:</span>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-300 marker:text-slate-500 font-medium">
                  {(message.content as ChatResponse).steps.map((step, idx) => (
                    <li key={idx} className="pl-1">{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Documents Required */}
            {((message.content as ChatResponse).documents_required && (message.content as ChatResponse).documents_required.length > 0) && (
              <div>
                <span className="font-semibold text-slate-100 text-sm mb-2 block">Documents Required:</span>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300 marker:text-slate-500">
                  {(message.content as ChatResponse).documents_required.map((doc, idx) => (
                    <li key={idx} className="pl-1">{doc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confidence Indicator */}
            <div className="mt-2 pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">AI Generated Response</span>
              <ConfidenceBadge score={(message.content as ChatResponse).confidence_score} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
