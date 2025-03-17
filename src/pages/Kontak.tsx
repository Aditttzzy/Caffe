
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Kontak = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [mapRef, mapInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error('Mohon isi semua kolom yang diperlukan');
      return;
    }
    
    // Simulate form submission success
    toast.success('Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.');
    setName('');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      
      <div className="pt-24 md:pt-32">
        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "relative py-20 mb-16 transition-all duration-700",
            headerInView ? "opacity-100" : "opacity-0"
          )}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-coffee-dark/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Hubungi Kami</h1>
            <p className="text-xl max-w-2xl mx-auto text-white/90">
              Kami senang mendengar dari Anda! Jangan ragu untuk menghubungi kami dengan pertanyaan, saran, atau pesan.
            </p>
          </div>
        </div>
        
        {/* Contact Content */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              ref={formRef}
              className={cn(
                "bg-white p-8 rounded-xl shadow-md transition-all duration-700 transform",
                formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-coffee-dark">
                Kirim Pesan
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-coffee/20 focus-visible:ring-coffee"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-coffee/20 focus-visible:ring-coffee"
                    placeholder="Masukkan alamat email Anda"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Pesan
                  </label>
                  <Textarea 
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[150px] border-coffee/20 focus-visible:ring-coffee"
                    placeholder="Apa yang ingin Anda sampaikan kepada kami?"
                  />
                </div>
                
                <Button type="submit" className="coffee-button w-full">
                  Kirim Pesan
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div 
              ref={mapRef}
              className={cn(
                "transition-all duration-700 transform",
                mapInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-coffee-dark">
                Informasi Kontak
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-coffee-cream p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Alamat</h3>
                    <p className="text-gray-600">Jl. Kopi Nikmat No. 123, Pekanbaru, Indonesia</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-coffee-cream p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Telepon</h3>
                    <p className="text-gray-600">+62 812 3456 7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-coffee-cream p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@malamcaffe.id</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-coffee-cream p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Jam Operasional</h3>
                    <p className="text-gray-600">Senin - Jumat: 07:00 - 22:00</p>
                    <p className="text-gray-600">Sabtu - Minggu: 08:00 - 23:00</p>
                  </div>
                </div>
              </div>
              
              {/* Google Maps Embed (Placeholder) */}
              <div className="rounded-xl overflow-hidden h-[300px] shadow-md border border-coffee/10">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-600">Peta Lokasi Malam Caffe</p>
                  {/* You can replace this with an actual Google Maps embed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Kontak;
