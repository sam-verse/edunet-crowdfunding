import React from 'react';
import { motion } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const markers = [
  { coordinates: [-74.006, 40.7128], name: "New York", donations: "$150,000" },
  { coordinates: [-0.1276, 51.5074], name: "London", donations: "$120,000" },
  { coordinates: [139.6917, 35.6895], name: "Tokyo", donations: "$200,000" },
  { coordinates: [151.2093, -33.8688], name: "Sydney", donations: "$80,000" },
  { coordinates: [103.8198, 1.3521], name: "Singapore", donations: "$95,000" },
];

export default function WorldMap() {
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  return (
    <div className="bg-gray-900 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Global Impact</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join our worldwide community of donors making a difference across the globe
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-[600px] rounded-lg overflow-hidden bg-gray-800/50 backdrop-blur-sm"
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 150
            }}
          >
            <ZoomableGroup center={[0, 20]} zoom={1}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#374151"
                      stroke="#4B5563"
                      strokeWidth={0.5}
                      style={{
                        default: {
                          outline: "none",
                          transition: "all 0.3s",
                        },
                        hover: {
                          fill: "#4B5563",
                          outline: "none",
                        },
                        pressed: {
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {markers.map(({ coordinates, name, donations }) => (
                <motion.g
                  key={name}
                  whileHover={{ scale: 1.2 }}
                  onMouseEnter={() => setSelectedMarker({ name, donations })}
                  onMouseLeave={() => setSelectedMarker(null)}
                >
                  <Marker coordinates={coordinates}>
                    <motion.circle
                      r={6}
                      fill="#F43F5E"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                    />
                    {selectedMarker?.name === name && (
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pointer-events-none"
                      >
                        <rect
                          x="-60"
                          y="-40"
                          width="120"
                          height="30"
                          fill="#F43F5E"
                          rx="4"
                        />
                        <text
                          textAnchor="middle"
                          y="-20"
                          fill="#FFFFFF"
                          fontSize="12"
                          fontFamily="system-ui"
                        >
                          {name}: {donations}
                        </text>
                      </motion.g>
                    )}
                  </Marker>
                </motion.g>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {markers.map(({ name, donations }) => (
            <div
              key={name}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center"
            >
              <h3 className="text-white font-semibold">{name}</h3>
              <p className="text-rose-500 font-bold">{donations}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}