import React, { useState } from 'react';
import { motion } from 'motion/react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export const OptimizedImage = ({ src, alt, className = "", referrerPolicy = "no-referrer" }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blurred Placeholder/Skeleton while loading */}
      <div 
        className={`absolute inset-0 bg-white/5 animate-pulse transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} 
      />
      
      <motion.img
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={isLoaded ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.7 }}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy={referrerPolicy}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'scale-100' : 'scale-[1.02]'}`}
      />
    </div>
  );
};
