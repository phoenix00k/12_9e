import React from 'react';
import { motion } from 'framer-motion';
import { Zap, RefreshCw, Image, Settings, Eye, Layers } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Compare All AIs',
    description: 'Run the same prompt across multiple AI models and compare responses instantly.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Prompt Boost',
    description: 'Automatically optimize your prompts for better results across all models.',
    gradient: 'from-pink-500 to-red-500'
  },
  {
    icon: Image,
    title: 'Multi-Modal AI',
    description: 'Generate images, transcribe audio, and process various content types.',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    icon: Settings,
    title: 'Custom Workflows',
    description: 'Create personalized AI workflows with system instructions and automation.',
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    icon: RefreshCw,
    title: 'Real-time Sync',
    description: 'Seamless synchronization across all your devices and platforms.',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Layers,
    title: 'Unified Interface',
    description: 'Access all AI models through one clean, intuitive interface.',
    gradient: 'from-blue-500 to-purple-500'
  }
];

export const Features: React.FC = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of AI interaction with our comprehensive suite of tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};