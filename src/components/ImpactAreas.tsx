import React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const defaultImpactAreas = [
  {
    id: '1',
    title: 'Education for All',
    description: 'Supporting underprivileged children with quality education and learning resources.',
    image_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Healthcare Support',
    description: 'Providing medical assistance and healthcare facilities to those in need.',
    image_url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b98?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Food Security',
    description: 'Ensuring nutritious meals reach vulnerable communities and fighting hunger.',
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Rural Development',
    description: 'Empowering rural communities through sustainable development initiatives.',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
  },
];

export default function ImpactAreas() {
  const [areas, setAreas] = React.useState(defaultImpactAreas);

  React.useEffect(() => {
    fetchImpactAreas();
  }, []);

  async function fetchImpactAreas() {
    try {
      const { data, error } = await supabase
        .from('impact_areas')
        .select('*')
        .order('created_at');

      if (error) throw error;
      setAreas(data || defaultImpactAreas);
    } catch (error) {
      console.error('Error fetching impact areas:', error);
    }
  }

  return (
    <div className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-400">
            Areas of Impact
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Together, we're creating lasting change across multiple sectors. See how your support transforms lives and communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={area.image_url}
                  alt={area.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">{area.title}</h3>
                  <p className="text-gray-200">{area.description}</p>
                </motion.div>
              </div>

              <motion.div
                className="absolute inset-0 border-2 border-rose-500/0 group-hover:border-rose-500/50 rounded-2xl transition-all duration-300"
                whileHover={{ scale: 0.98 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Impact Stories */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl"
          >
            <div className="text-4xl font-bold text-rose-500 mb-3">95%</div>
            <h4 className="text-xl font-semibold text-white mb-2">Education Success</h4>
            <p className="text-gray-300">Of supported students complete their education and pursue higher studies</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl"
          >
            <div className="text-4xl font-bold text-rose-500 mb-3">80K+</div>
            <h4 className="text-xl font-semibold text-white mb-2">Lives Impacted</h4>
            <p className="text-gray-300">Through our healthcare and wellness programs across India</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl"
          >
            <div className="text-4xl font-bold text-rose-500 mb-3">1M+</div>
            <h4 className="text-xl font-semibold text-white mb-2">Meals Served</h4>
            <p className="text-gray-300">To families and communities facing food insecurity</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}