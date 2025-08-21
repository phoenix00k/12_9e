import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How does the pricing work?",
    answer: "Simple! Pay ₹1/month or ₹5/year for unlimited access to 6 premium AIs. No hidden costs, no per-message charges, no limits."
  },
  {
    question: "Are the messages really unlimited?",
    answer: "Yes! Unlike other platforms that limit you to 25-50 messages per month, Thanos AI gives you unlimited conversations with all models."
  },
  {
    question: "Which AI models are included?",
    answer: "You get GPT-4, Claude, Gemini, Perplexity, Grok, and DeepSeek. That's 6 premium AIs for the price others charge for just one!"
  },
  {
    question: "How often do you add new models?",
    answer: "We continuously add the latest AI models as they become available. Your subscription includes all current and future models at no extra cost."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely! No contracts, no commitments. Cancel anytime and keep using the service until your billing period ends."
  },
  {
    question: "Is my data secure?",
    answer: "Your privacy is our priority. We use enterprise-grade encryption, don't store your conversations permanently, and never share your data with third parties."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-6">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Got <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Questions?</span>
          </h2>
          <p className="text-xl text-gray-300">
            We've got answers. Here's everything you need to know about Thanos AI.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-purple-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};