import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

interface DemoProps {
  onWatchDemo: () => void;
}

export const Demo: React.FC<DemoProps> = ({ onWatchDemo }) => {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI ka Thanos</span> in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how Thanos AI delivers what others miss. Compare, analyze, and get the best from every AI model.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative group cursor-pointer" onClick={onWatchDemo}>
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-8 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              {/* Video Thumbnail Placeholder */}
              <div className="relative bg-gray-900/50 rounded-2xl aspect-video flex items-center justify-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent_70%)]" />
                
                {/* Play Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-6 shadow-lg group-hover:shadow-purple-500/25"
                >
                  <Play className="w-12 h-12 text-white ml-1" />
                </motion.div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"
                      animate={{
                        x: [0, Math.random() * 50 - 25],
                        y: [0, Math.random() * 50 - 25],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Demo Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  'Multi-AI Compare',
                  'Real-time Results',
                  'Smart Analysis',
                  'One-Click Export'
                ].map((feature, idx) => (
                  <div key={feature} className="text-center">
                    <div className="flex items-center justify-center gap-1 text-purple-400">
                      <Sparkles className="w-3 h-3" />
                      <span className="text-xs font-medium">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};