import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown } from 'lucide-react';

interface PricingProps {
  onSubscribe: (plan: 'monthly' | 'yearly') => void;
}

const plans = [
  {
    name: 'Monthly',
    price: '₹1',
    period: '/month',
    features: [
      'Access to 6 Premium AIs',
      'Compare responses side-by-side',
      'Unlimited messages',
      'Prompt optimization',
      'Image generation',
      'Audio transcription',
    ],
    popular: false,
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    name: 'Yearly',
    price: '₹5',
    period: '/year',
    features: [
      'Everything in Monthly',
      'Custom AI workflows',
      'Priority support',
      'Advanced system instructions',
      'Export chat history',
      'API access',
    ],
    popular: true,
    gradient: 'from-cyan-500 to-purple-600'
  }
];

export const Pricing: React.FC<PricingProps> = ({ onSubscribe }) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900" id="pricing">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            6 AIs for <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Half the Price</span> of One
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get access to GPT-4, Claude, Gemini, Perplexity, Grok, and DeepSeek for less than what others charge for just one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border ${plan.popular ? 'border-purple-500/50' : 'border-gray-700/50'} hover:border-purple-500/50 transition-all duration-300 hover:scale-105`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className={`p-1 rounded-full bg-gradient-to-r ${plan.gradient}`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSubscribe(plan.name.toLowerCase() as 'monthly' | 'yearly')}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group ${
                    plan.popular ? 'bg-gradient-to-r from-cyan-500 to-purple-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    Get Started
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button>

                {plan.popular && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${plan.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <p className="text-gray-300 mb-2">Compare: ChatGPT Plus costs $20/month</p>
            <p className="text-purple-400 font-semibold">Thanos AI: 6 AIs for ₹1/month (≈ $0.01)</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};