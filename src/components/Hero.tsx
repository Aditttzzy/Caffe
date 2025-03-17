
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'; // Changed import

const Hero = () => {
  const smokeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createSmokeParticle = () => {
      if (!smokeRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'smoke-animation bg-white/20 rounded-full';
      
      // Random position and size
      const size = Math.random() * 20 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${50 + (Math.random() * 20 - 10)}%`;
      particle.style.bottom = '50%';
      
      smokeRef.current.appendChild(particle);
      
      // Remove particle after animation completes
      setTimeout(() => {
        if (particle.parentNode === smokeRef.current) {
          smokeRef.current.removeChild(particle);
        }
      }, 3000);
    };
    
    const interval = setInterval(createSmokeParticle, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl mb-4 font-medium animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            akhiri hari anda dengan sempurna bersama
          </p>
          
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Kopi
            </h1>
            
            {/* Smoke animation container */}
            <div ref={smokeRef} className="absolute w-full h-16 bottom-full left-0 pointer-events-none"></div>
          </div>
          
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Kopi terbaik dari biji pilihan, disangrai dengan sempurna untuk cita rasa yang kaya dan aroma yang menggoda. Kami memilih biji kopi premium untuk memberikan pengalaman kopi terbaik kepada Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link to="/Menu">
              <Button className="coffee-button">Lihat Menu</Button>
            </Link>
            <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="text-sm mb-2">Scroll</span>
        <div className="w-1 h-8 bg-white/50 rounded-full">
          <div className="w-1 h-2 bg-white rounded-full animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
