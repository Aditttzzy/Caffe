
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

const OrderSuccess = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-20">
        <div 
          ref={ref}
          className={cn(
            "bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="mb-6">
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-display font-bold mb-4 text-coffee-dark">Pesanan Berhasil!</h1>
          
          <p className="text-gray-600 mb-6">
            Terima kasih telah berbelanja di Malam Caffe. Pesanan Anda dengan nomor <span className="font-medium text-coffee-dark">{orderId}</span> telah berhasil dibuat.
          </p>

          <div className="bg-coffee-cream/30 p-4 rounded-lg mb-8">
            <p className="text-coffee mb-2 font-medium">Status Pembayaran</p>
            <p className="text-gray-600">
              Kami akan memproses pesanan Anda setelah pembayaran dikonfirmasi. Silakan cek email Anda untuk informasi lebih detail.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/">
              <Button variant="outline" className="w-full border-coffee text-coffee hover:bg-coffee-cream">
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </Link>
            <Link to="/menu">
              <Button className="coffee-button w-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Belanja Lagi
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
