'use client';

import { motion } from 'framer-motion';

export default function RotatingGlobe() {
  return (
    <div style={{ perspective: '1200px', width: '500px', height: '500px', margin: '0 auto' }}>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '70%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d'
        }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {/* Longitude lines */}
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            transform: `rotateY(${i * 15}deg)`,
            pointerEvents: 'none'
          }} />
        ))}
        
        {/* Latitude lines */}
        {[...Array(8)].map((_, i) => (
          <div key={`lat-${i}`} style={{
            position: 'absolute',
            width: `${Math.sin(Math.PI * (i + 1) / 9) * 100}%`,
            height: `${Math.sin(Math.PI * (i + 1) / 9) * 100}%`,
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '110%',
            transform: `rotateX(90deg) translateZ(${(i - 3.5) * 50}px)`,
            pointerEvents: 'none'
          }} />
        ))}

        {/* Floating Points / Nodes */}
        {[...Array(20)].map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 20);
          const theta = Math.sqrt(20 * Math.PI) * phi;
          const x = 250 * Math.sin(phi) * Math.cos(theta);
          const y = 250 * Math.sin(phi) * Math.sin(theta);
          const z = 250 * Math.cos(phi);
          
          return (
            <motion.div
              key={`node-${i}`}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                boxShadow: '0 0 10px rgba(255,255,255,0.8)'
              }}
              animate={{
                opacity: [0.2, 1, 0.2]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          );
        })}

        {/* Inner glow sphere */}
        <div style={{
          position: 'absolute',
          width: '98%',
          height: '98%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, transparent 70%)',
          border: '1px solid rgba(255,255,255,0.2)',
          pointerEvents: 'none'
        }} />
      </motion.div>
    </div>
  );
}
