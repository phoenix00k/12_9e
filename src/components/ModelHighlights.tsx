import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Brain, Code, Image, MessageCircle } from 'lucide-react';

const models = [
  {
    name: 'GPT-4',
    provider: 'OpenAI',
    icon: Brain,
    strengths: ['Creative Writing', 'Complex Reasoning', 'Code Generation'],
    color: 'from-green-400 to-emerald-500',
    description: 'Most versatile AI for general tasks'
  },
  {
    name: 'Claude',
    provider: 'Anthropic',
    icon: MessageCircle,
    strengths: ['Long Context', 'Analysis', 'Safety'],
    color: 'from-orange-400 to-red-500',
    description: 'Best for detailed analysis and conversations'
  },
  {
    name: 'Gemini',
    provider: 'Google',
    icon: Zap,
    strengths: ['Multimodal', 'Fast', 'Integration'],
    color: 'from-blue-400 to-cyan-500',
    description: 'Google\'s fastest and most integrated AI'
  },
  {
    name: 'Perplexity',
    provider: 'Perplexity AI',
    icon: Bot,
    strengths: ['Web Search', 'Current Events', 'Citations'],
    color: 'from-purple-400 to-pink-500',
    description: 'Real-time web search and information'
  },
  {
    name: 'Grok',
    provider: 'xAI',
    icon: Code,
    strengths: ['Humor', 'Real-time', 'Controversial'],
    color: 'from-indigo-400 to-purple-500',
    description: 'Elon\'s witty AI with real-time data'
  },
  {
    name: 'DeepSeek',
    provider: 'DeepSeek',
    icon: Image,
    strengths: ['Math', 'Logic', 'Efficiency'],
    color: 'from-pink-400 to-rose-500',
    description: 'Powerful reasoning at low cost'
  }
];

export const ModelHighlights: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Arsenal</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each AI has unique strengths. Why choose one when you can have them all?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${model.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <model.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{model.name}</h3>
                  <p className="text-sm text-gray-400">{model.provider}</p>
                </div>
                
                <p className="text-gray-300 mb-6">{model.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-purple-400 mb-2">Key Strengths:</p>
                  {model.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${model.color}`} />
                      <span className="text-sm text-gray-300">{strength}</span>
                    </div>
                  ))}
                </div>

                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${model.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};