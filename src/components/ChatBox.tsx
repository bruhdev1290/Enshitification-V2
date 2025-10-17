import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiAI';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBoxProps {
  colors: any;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ colors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (!geminiService.isAvailable()) {
        const errorMessage: Message = {
          role: 'assistant',
          content: 'AI chatbot requires Gemini API key. Please add VITE_GEMINI_API_KEY to your environment variables to enable this feature.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }

      // Use the consumer advice bot for chatbot interactions
      const response = await geminiService.consumerAdviceBot(inputValue, {
        portalContext: 'The Enshitification Portal - tracking quality decline and consumer protection',
        dataSources: ['CFPB (1.8M+ financial complaints)', 'NHTSA (14K+ automotive recalls)', 'CPSC (8K+ product recalls)', 'FTC (5.8M+ fraud complaints)'],
        purpose: 'Identify companies with declining quality, track recalls, analyze complaint trends, and provide data-driven consumer protection insights'
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow z-50"
        style={{
          backgroundColor: colors.primary,
          color: colors.white,
          border: 'none',
          cursor: 'pointer'
        }}
        title="Open Consumer Protection Assistant"
      >
        <MessageCircle size={24} />
        <Sparkles size={16} className="absolute -top-1 -right-1" style={{ color: colors.caGold }} />
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 rounded-lg shadow-2xl flex flex-col z-50"
      style={{
        backgroundColor: colors.white,
        width: '380px',
        maxWidth: 'calc(100vw - 3rem)',
        height: '600px',
        maxHeight: 'calc(100vh - 3rem)',
        border: `1px solid ${colors.gray200}`
      }}
    >
      {/* Header */}
      <div
        className="p-4 rounded-t-lg flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          color: colors.white
        }}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={20} />
          <h3 className="font-bold">Consumer Assistant</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded hover:bg-white/20 transition-colors"
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: colors.white }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: colors.gray50 }}>
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Sparkles size={48} style={{ color: colors.gray300, margin: '0 auto' }} />
            <p className="mt-4 text-sm" style={{ color: colors.gray500 }}>
              Ask me about recalls, quality decline, complaints, or the portal's federal data sources!
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold" style={{ color: colors.gray700 }}>Example questions:</p>
              <div className="text-xs space-y-1" style={{ color: colors.gray600 }}>
                <p>"What are common automotive recalls?"</p>
                <p>"Which company has the most decline in quality?"</p>
                <p>"Has Amazon Basics had a recall?"</p>
                <p>"What motor vehicle company has the most recalls?"</p>
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[80%] p-3 rounded-lg"
              style={{
                backgroundColor: message.role === 'user' ? colors.primary : colors.white,
                color: message.role === 'user' ? colors.white : colors.gray900,
                border: message.role === 'assistant' ? `1px solid ${colors.gray200}` : 'none'
              }}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p
                className="text-xs mt-1 opacity-70"
                style={{ color: message.role === 'user' ? colors.white : colors.gray500 }}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg" style={{ backgroundColor: colors.white, border: `1px solid ${colors.gray200}` }}>
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderColor: colors.primary }}></div>
                <span className="text-sm" style={{ color: colors.gray700 }}>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t" style={{ borderColor: colors.gray200, backgroundColor: colors.white }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 text-sm border rounded"
            style={{
              borderColor: colors.gray300,
              color: colors.gray900,
              outline: 'none',
              opacity: isLoading ? 0.6 : 1
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="p-2 rounded"
            style={{
              backgroundColor: isLoading || !inputValue.trim() ? colors.gray300 : colors.primary,
              color: colors.white,
              border: 'none',
              cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            <Send size={20} />
          </button>
        </div>
        {!geminiService.isAvailable() && (
          <p className="text-xs mt-2" style={{ color: colors.warning }}>
            ⚠️ AI features require Gemini API key
          </p>
        )}
      </div>
    </div>
  );
};
