import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader, X, Maximize2 } from 'lucide-react';
import { sendMessageToAI, aiModels } from '../services/aiService';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  message: string;
  responses: { [key: string]: string };
  timestamp: Date;
  isLoading: boolean;
}

export const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const messageId = Date.now().toString();
    const newMessage: ChatMessage = {
      id: messageId,
      message: inputMessage,
      responses: {},
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Send to all AI models
    
    try {
      const promises = aiModels.map(async (model) => {
        try {
          const response = await sendMessageToAI(inputMessage, model.id);
          
          // Update message with new response
          setMessages(prev => prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, responses: { ...msg.responses, [model.id]: response } }
              : msg
          ));
        } catch (error) {
          console.error(`Error with ${model.name}:`, error);
          const errorResponse = `Error: Could not get response from ${model.name}`;
          setMessages(prev => prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, responses: { ...msg.responses, [model.id]: errorResponse } }
              : msg
          ));
        }
      });

      await Promise.all(promises);

    } catch (error) {
      console.error('Error sending messages:', error);
    } finally {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, isLoading: false } : msg
      ));
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-6xl h-[80vh] bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Thanos AI Chat</h2>
                <p className="text-sm text-gray-400">Compare responses from 6 AI models</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
                <p>Ask me anything and see how different AI models respond!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 max-w-md">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-white" />
                        <span className="text-sm text-purple-100">You</span>
                      </div>
                      <p className="text-white">{message.message}</p>
                    </div>
                  </div>

                  {/* AI Responses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aiModels.map((model) => (
                      <div
                        key={model.id}
                        className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700/30"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Bot className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-semibold text-white">{model.name}</span>
                        </div>
                        
                        {message.isLoading && !message.responses[model.id] ? (
                          <div className="flex items-center gap-2 text-gray-400">
                            <Loader className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-300 leading-relaxed">
                            {message.responses[model.id] || 'No response yet...'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-700/50">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl p-4 pr-12 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none min-h-[60px]"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              {aiModels.map((model, index) => (
                <div key={model.id} className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  <span>{model.name}</span>
                  {index < aiModels.length - 1 && <span className="ml-4">•</span>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};