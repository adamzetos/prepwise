/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Features Section
 * Purpose: Showcase key features with hover effects
 * Why Needed: Communicate product value propositions
 */

import { motion } from 'framer-motion';

const features = [
  {
    title: 'AI Practice & Feedback',
    description: 'Get instant, personalized feedback on your interview responses powered by advanced AI.',
    icon: '🤖',
    color: 'bg-blue-100',
    hoverColor: 'hover:bg-blue-200'
  },
  {
    title: 'Track Your Progress',
    description: 'Monitor your improvement over time with detailed analytics and performance metrics.',
    icon: '📊',
    color: 'bg-green-100',
    hoverColor: 'hover:bg-green-200'
  },
  {
    title: 'Real-World Simulation',
    description: 'Experience authentic interview scenarios tailored to your industry and role.',
    icon: '🎯',
    color: 'bg-purple-100',
    hoverColor: 'hover:bg-purple-200'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Why Choose PrepWise?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our AI-powered platform provides everything you need to excel in your interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl ${feature.color} ${feature.hoverColor} transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer`}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}