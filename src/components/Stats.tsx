import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Users, Heart, DollarSign, Globe } from 'lucide-react';

export default function Stats() {
  const stats = [
    { icon: Users, value: 1000, label: 'Donors', prefix: '+' },
    { icon: Heart, value: 50, label: 'Campaigns', prefix: '' },
    { icon: DollarSign, value: 500000, label: 'Raised', prefix: '$' },
    { icon: Globe, value: 25, label: 'Countries', prefix: '' },
  ];

  return (
    <div className="bg-rose-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <stat.icon className="h-8 w-8 mx-auto text-rose-500 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.prefix}
                <CountUp end={stat.value} duration={2.5} separator="," />
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}