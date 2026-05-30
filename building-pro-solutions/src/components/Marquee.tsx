import { motion } from 'motion/react';
import React from 'react';

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number; // seconds for one full loop
  direction?: 'left' | 'right';
  className?: string;
}

export const Marquee = ({ 
  items, 
  speed = 40, 
  direction = 'left',
  className = ''
}: MarqueeProps) => {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap min-w-max"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {/* Render items twice for seamless loop */}
        <div className="flex gap-16 px-8 items-center">
          {items.map((item, i) => (
            <div key={`first-${i}`}>{item}</div>
          ))}
        </div>
        <div className="flex gap-16 px-8 items-center">
          {items.map((item, i) => (
            <div key={`second-${i}`}>{item}</div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
