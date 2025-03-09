import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { supabase } from '../lib/supabase';
import { Users, Heart, DollarSign, Globe } from 'lucide-react';

export default function DonationStats() {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    fetchDonationStats();
  }, []);

  async function fetchDonationStats() {
    try {
      const { data, error } = await supabase
        .from('donation_stats')
        .select('*')
        .single();

      if (error) throw error;
      setStats(data);
    } catch (error) {
      console.error('Error fetching donation stats:', error);
    }
  }

  if (!stats) return null;

  const statItems = [
    { icon: Users, value: stats.total_donors, label: 'Donors', prefix: '+' },
    { icon: Heart, value: stats.total_campaigns, label: 'Campaigns', prefix: '' },
    { icon: DollarSign, value: stats.total_amount, label: 'Raised', prefix: '₹' },
    { icon: Globe, value: stats.countries_reached, label: 'Countries', prefix: '' },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-400"
        >
          Our Impact
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-8 text-center hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 mx-auto bg-gradient-to-br from-rose-500 to-purple-500 rounded-xl flex items-center justify-center mb-6"
              >
                <stat.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {stat.prefix}
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  decimals={stat.label === 'Raised' ? 2 : 0}
                />
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}