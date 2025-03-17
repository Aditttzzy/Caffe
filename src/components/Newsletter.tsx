
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Silakan masukkan alamat email Anda');
      return;
    }
    
    // Simulate subscription success
    toast.success('Terima kasih telah berlangganan!');
    setEmail('');
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-coffee-dark/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={ref}
          className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
            Berlangganan untuk Berita Terbaru
          </h2>
          <p className="text-base md:text-lg mb-8 text-white/80">
            Dapatkan informasi tentang menu baru, promo spesial, dan event-event Malam Caffe
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Alamat email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-coffee-light"
            />
            <Button type="submit" className="coffee-button whitespace-nowrap">
              Berlangganan
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
