'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function GuidingElement() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const yPos = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* Desktop: vertical left sidebar */}
      <div className="mobile-hide" style={{ position: 'fixed', left: '40px', top: '0', bottom: '0', width: '1px', zIndex: 50 }}>
        {/* Track */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '100%', background: 'rgba(255,255,255,0.1)' }} />
        {/* Progress Line */}
        <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', bottom: 0, background: 'rgba(255,255,255,0.5)', scaleY, transformOrigin: 'top' }} />
        {/* Dot */}
        <motion.div
          style={{
            position: 'absolute',
            top: yPos,
            left: '50%',
            x: '-50%',
            y: '-50%',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 20px 4px rgba(255,255,255,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: 4, height: 4, backgroundColor: '#000', borderRadius: '50%' }} />
        </motion.div>
      </div>

      {/* Mobile: horizontal top progress bar */}
      <div className="desktop-hide" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 100, background: 'rgba(255,255,255,0.08)' }}>
        <motion.div style={{ height: '100%', background: '#DFFF00', scaleX, transformOrigin: 'left' }} />
      </div>
    </>
  );
}
