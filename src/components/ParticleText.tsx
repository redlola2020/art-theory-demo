import React, { useRef, useEffect } from 'react';

interface ParticleTextProps {
  text: string;
}

const ParticleText: React.FC<ParticleTextProps> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Config for exact gathering
    const TARGET_PARTICLE_COUNT = 7000;
    const ANIMATION_DURATION = 5000; // exactly 5 seconds
    
    let particlesArray: Particle[] = [];
    let startTime: number | null = null;
    let animationFrameId: number;

    const initParticles = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      // Use vintage serif font, scaled down to 1/2 size
      ctx.font = 'bold 7.5vw Georgia, "Times New Roman", serif'; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);

      const textCoordinates = ctx.getImageData(0, 0, width, height);
      
      const validPixels: {x: number, y: number}[] = [];
      const step = 1; // Extremely dense sampling
      
      for (let y = 0; y < textCoordinates.height; y += step) {
        for (let x = 0; x < textCoordinates.width; x += step) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            validPixels.push({x, y});
          }
        }
      }
      
      const selectedPixels: {x: number, y: number}[] = [];
      if (validPixels.length > 0) {
        while (selectedPixels.length < TARGET_PARTICLE_COUNT) {
          validPixels.sort(() => Math.random() - 0.5);
          const toAdd = validPixels.slice(0, TARGET_PARTICLE_COUNT - selectedPixels.length);
          selectedPixels.push(...toAdd);
        }
      }
      
      particlesArray = selectedPixels.map(pixel => new Particle(pixel.x, pixel.y));
      startTime = null; 
    };
    
    class Particle {
      x: number;
      y: number;
      startX: number;
      startY: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      baseAlpha: number;
      flashSpeed: number;
      delay: number;

      constructor(baseX: number, baseY: number) {
        // Gather from all directions, far outside the center
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.max(width, height) * (0.8 + Math.random() * 0.5);
        this.startX = width / 2 + Math.cos(angle) * distance;
        this.startY = height / 2 + Math.sin(angle) * distance;
        
        this.x = this.startX;
        this.y = this.startY;
        this.baseX = baseX;
        this.baseY = baseY;
        
        // Particles of varying sizes
        this.size = Math.random() * 2.5 + 0.5;
        
        // Bright Multi-colored gold / iridescent
        const h = 35 + Math.random() * 25; // 35-60 (gold to yellow)
        const s = 80 + Math.random() * 20; // 80-100% saturation
        const l = 60 + Math.random() * 40; // 60-100% lightness for bright shine
        this.color = `hsl(${h}, ${s}%, ${l}%)`;
        
        this.baseAlpha = Math.random() * 0.6 + 0.4;
        this.flashSpeed = Math.random() * 0.005 + 0.002;
        
        // Random delay (0 to 1200ms) for an organic gathering effect
        this.delay = Math.random() * 1200;
      }
      
      draw(time: number) {
        // Flashing effect based on sine wave
        const currentAlpha = this.baseAlpha * (0.5 + 0.5 * Math.sin(time * this.flashSpeed + this.delay));
        
        ctx!.globalAlpha = currentAlpha;
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();
      }
      
      update(currentTime: number, animStartTime: number) {
        const elapsed = currentTime - animStartTime;
        
        let pTime = elapsed - this.delay;
        if (pTime < 0) pTime = 0;
        
        const progress = Math.min(pTime / (ANIMATION_DURATION - this.delay), 1);
        
        // Silky smooth easing: easeOutQuart (1 - (1-t)^4)
        const ease = 1 - Math.pow(1 - progress, 4);
        
        this.x = this.startX + (this.baseX - this.startX) * ease;
        this.y = this.startY + (this.baseY - this.startY) * ease;
        
        // Add subtle floating effect once settled
        if (progress >= 1) {
           const timeOff = currentTime * 0.001;
           // Gentle organic floating
           const floatX = Math.sin(timeOff * 1.5 + this.baseY * 0.05) * 1.5;
           const floatY = Math.cos(timeOff * 1.2 + this.baseX * 0.05) * 1.5;
           this.x = this.baseX + floatX;
           this.y = this.baseY + floatY;
        }
      }
    }

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      
      ctx!.globalAlpha = 1; // reset alpha for clearRect
      ctx!.globalCompositeOperation = 'source-over';
      ctx!.clearRect(0, 0, width, height);
      
      ctx!.globalCompositeOperation = 'lighter';
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(time, startTime);
        particlesArray[i].draw(time);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20 mix-blend-screen" />;
};

export default ParticleText;
