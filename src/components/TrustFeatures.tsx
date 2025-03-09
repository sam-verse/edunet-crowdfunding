import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, PieChart, Headphones, Bell, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

const iconMap = {
  shield: Shield,
  'check-circle': CheckCircle,
  'pie-chart': PieChart,
  headphones: Headphones,
  bell: Bell,
  globe: Globe,
};

const defaultFeatures = [
  {
    id: '1',
    title: 'Transparent Operations',
    description: 'Every donation is tracked and its impact is reported back to donors.',
    icon_name: 'check-circle'
  },
  {
    id: '2',
    title: 'Direct Impact',
    description: '100% of your donation goes directly to the cause you choose to support.',
    icon_name: 'pie-chart'
  },
  {
    id: '3',
    title: 'Secure Platform',
    description: 'Your data and transactions are protected with enterprise-grade security.',
    icon_name: 'shield'
  },
  {
    id: '4',
    title: 'Local Partnerships',
    description: 'We work with trusted local organizations to maximize impact.',
    icon_name: 'globe'
  },
  {
    id: '5',
    title: '24/7 Support',
    description: 'Our dedicated team is always here to assist you.',
    icon_name: 'headphones'
  },
  {
    id: '6',
    title: 'Regular Updates',
    description: 'Stay informed about the progress and impact of your contributions.',
    icon_name: 'bell'
  }
];

export default function TrustFeatures() {
  const [features, setFeatures] = React.useState(defaultFeatures);

  React.useEffect(() => {
    fetchTrustFeatures();
  }, []);

  async function fetchTrustFeatures() {
    try {
      const { data, error } = await supabase
        .from('trust_features')
        .select('*')
        .order('created_at');

      if (error) throw error;
      setFeatures(data || defaultFeatures);
    } catch (error) {
      console.error('Error fetching trust features:', error);
    }
  }

  return (
    <div className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-400"
        >
          Why Trust Us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon_name];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 bg-gradient-to-br from-rose-500 to-purple-500 rounded-xl flex items-center justify-center mb-6"
                >
                  {Icon && <Icon className="w-7 h-7 text-white" />}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-gray-800 p-6 rounded-xl text-center"
            >
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
                alt="Food Distribution"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-white font-semibold">Food Security Programs</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-xl text-center"
            >
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80"
                alt="Education Support"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-white font-semibold">Education Initiatives</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 p-6 rounded-xl text-center"
            >
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80"
                alt="Healthcare Support"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-white font-semibold">Healthcare Access</h3>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}