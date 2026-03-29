"use client";

import { useContext } from "react";
import { motion, useTransform } from "framer-motion";
import { ScrollContext } from "./ScrollyCanvas";

export default function Overlay() {
  const scrollYProgress = useContext(ScrollContext);

  if (!scrollYProgress) {
    return null;
  }

  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Section 2: 25% to 45% (Trigger around 30%)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

  // Section 3: 55% to 80% (Trigger around 60%)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  return (
    <div className="absolute inset-0 z-10 w-full pointer-events-none flex items-center">
      
      {/* Social Links Header sticky */}
      <div className="absolute top-6 right-8 flex gap-8 z-50 pointer-events-auto text-sm font-medium tracking-widest uppercase">
        <a href="https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
          LinkedIn
        </a>
        <a href="https://github.com/powar293" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
          GitHub
        </a>
        <a href="mailto:prathmeshpowar29@gmail.com" className="text-white/60 hover:text-white transition-colors">
          Email
        </a>
      </div>

      <div className="container mx-auto px-4 w-full h-full relative">
        
        {/* Section 1: Center */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pb-24"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
            Prathmesh Powar
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 font-light drop-shadow-md">
            AI Robotics Engineer
          </p>
        </motion.div>

        {/* Section 2: Left Aligned */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left pl-4 md:pl-20"
        >
          <h2 className="text-4xl md:text-6xl max-w-2xl font-semibold leading-tight text-white drop-shadow-lg">
            I build autonomous <span className="text-neutral-400">AI systems</span>.
          </h2>
        </motion.div>

        {/* Section 3: Right Aligned */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center text-right pr-4 md:pr-20"
        >
          <h2 className="text-4xl md:text-6xl max-w-2xl font-semibold leading-tight text-white drop-shadow-lg">
            Merging machine learning with <span className="text-neutral-400">robotics</span>.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
