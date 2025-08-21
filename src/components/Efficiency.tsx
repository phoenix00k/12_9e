import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';

const models = [
  { name: 'GPT-4', color: 'from-green-400 to-emerald-500', delay: 0 },
  { name: 'Claude', color: 'from-orange-400 to-red-500', delay: 0.1 },
  { name: 'Gemini', color: 'from-blue-400 to-cyan-500', delay: 0.2 },
  { name: 'Grok', color: 'from-purple-400 to-pink-500', delay: 0.3 },
  { name: 'Perplexity', color: 'from-indigo-400 to-purple-500', delay: 0.4 },
  { name: 'DeepSeek', color: 'from-pink-400 to-rose-500', delay: 0.5 },
];

export const Efficiency: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            One Window. <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Six Perspectives.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Run prompts across GPT, Claude, Gemini & more instantly. Compare responses, analyze differences, and get the best insights.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Prompt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Your Prompt</span>
              </div>
              <p className="text-lg text-white max-w-md">
                "Explain quantum computing in simple terms"
              </p>
            </div>
          </motion.div>

          {/* AI Model Responses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: model.delay }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${model.color}`}>
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-white">{model.name}</span>
                  </div>
                  
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 bg-gray-800 rounded-full overflow-hidden"
                      >
                        <motion.div
                          className={`h-full bg-gradient-to-r ${model.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.random() * 40 + 60}%` }}
                          transition={{ duration: 1, delay: model.delay + i * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Response ready</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connecting Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-20">
              {models.map((_, index) => (
                <motion.line
                  key={index}
                  x1="50%"
                  y1="20%"
                  x2={`${20 + (index % 3) * 30}%`}
                  y2="80%"
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              ))}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};