"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, MotionValue } from "framer-motion";

// Update the frame count based on the files provided (00 to 74 = 75 frames)
const FRAME_COUNT = 75;

export const ScrollContext = createContext<MotionValue<number> | null>(null);

export default function ScrollyCanvas({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images inside useEffect to avoid SSR issues
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(2, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.067s.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    if (!img.complete) {
      img.onload = () => drawImage(index);
      return;
    }

    // Set canvas dimensions to window inner sizes to maintain sharpness
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Simulate object-fit: cover
    const imageAspectRatio = img.width / img.height;
    const canvasAspectRatio = canvas.width / canvas.height;
    
    let renderableWidth, renderableHeight, xStart, yStart;

    if (imageAspectRatio < canvasAspectRatio) {
      renderableWidth = canvas.width;
      renderableHeight = img.height * (renderableWidth / img.width);
      xStart = 0;
      yStart = (canvas.height - renderableHeight) / 2;
    } else {
      renderableHeight = canvas.height;
      renderableWidth = img.width * (renderableHeight / img.height);
      yStart = 0;
      xStart = (canvas.width - renderableWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Add a black fill behind the image just in case
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);
  };

  useEffect(() => {
    if (images.length > 0) {
      drawImage(Math.floor(scrollYProgress.get() * (FRAME_COUNT - 1)));
    }
    
    const handleResize = () => {
      drawImage(Math.min(
        FRAME_COUNT - 1, 
        Math.floor(scrollYProgress.get() * (FRAME_COUNT - 1))
      ));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    const frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
    const safeIndex = Math.min(FRAME_COUNT - 1, Math.max(0, frameIndex));
    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => drawImage(safeIndex));
  });

  return (
    <ScrollContext.Provider value={scrollYProgress}>
      <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
        <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="block h-full w-full object-cover" />
          {children}
        </div>
      </div>
    </ScrollContext.Provider>
  );
}
