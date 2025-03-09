import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Users, Heart, DollarSign, Globe } from 'lucide-react';

const impactData = [
  { city: "Chennai", amount: 150000, donors: 250, projects: 15, coordinates: { x: "75%", y: "85%" } },
  { city: "Bangalore", amount: 120000, donors: 180, projects: 12, coordinates: { x: "65%", y: "80%" } },
  { city: "Mumbai", amount: 200000, donors: 320, projects: 20, coordinates: { x: "30%", y: "60%" } },
  { city: "Delhi", amount: 95000, donors: 150, projects: 10, coordinates: { x: "45%", y: "35%" } },
  { city: "Kolkata", amount: 80000, donors: 130, projects: 8, coordinates: { x: "80%", y: "45%" } }
];

const additionalCities = [
  { city: "Hyderabad", amount: 85000, donors: 140, projects: 9, coordinates: { x: "55%", y: "70%" } },
  { city: "Pune", amount: 75000, donors: 120, projects: 7, coordinates: { x: "35%", y: "65%" } },
  { city: "Ahmedabad", amount: 70000, donors: 110, projects: 6, coordinates: { x: "25%", y: "50%" } }
];

const allCities = [...impactData, ...additionalCities];

// India map outline SVG URL
const INDIA_MAP_URL = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.svg';

export default function WorldMap() {
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  return (
    <div className="bg-gray-900 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-gray-900/50 to-rose-900/50" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Impact Across India</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Transforming lives through the power of collective giving in communities across the nation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Impact Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] bg-gray-800 rounded-xl p-4">
              <img
                src={"https://simplemaps.com/static/svg/country/in/admin1/in.svg"}
                alt="India Map"
                className={`w-full h-full object-contain transition-opacity duration-300 ${mapLoaded ? 'opacity-30' : 'opacity-0'}`}
                onLoad={() => setMapLoaded(true)}
              />
              {allCities.map((city, index) => (
                <motion.div
                  key={city.city}
                  className="absolute"
                  style={{ left: city.coordinates.x, top: city.coordinates.y }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  onHoverStart={() => setSelectedCity(city)}
                  onHoverEnd={() => setSelectedCity(null)}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.5 }}
                  >
                    <motion.div
                      className="w-4 h-4 bg-rose-500 rounded-full cursor-pointer"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <motion.div
                      className="absolute -inset-2 bg-rose-500/20 rounded-full"
                      animate={{
                        scale: [1, 2],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <p className="text-white text-sm font-medium bg-gray-800/80 px-2 py-1 rounded">
                      {city.city}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rose-500 scrollbar-track-gray-800"
          >
            {allCities.map((city) => (
              <motion.div
                key={city.city}
                className={`bg-gray-800 rounded-xl p-6 transition-all duration-300 ${
                  selectedCity?.city === city.city ? 'ring-2 ring-rose-500 transform scale-105' : ''
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{city.city}</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Amount Raised</p>
                    <p className="text-rose-400 font-bold">
                      ₹<CountUp end={city.amount} duration={2} separator="," />
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Donors</p>
                    <p className="text-rose-400 font-bold">
                      <CountUp end={city.donors} duration={2} />+
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Projects</p>
                    <p className="text-rose-400 font-bold">
                      <CountUp end={city.projects} duration={2} />
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}