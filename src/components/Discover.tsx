
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const Discover = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    delay: 200,
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    delay: 400,
  });

  return (
    <section className="section-padding bg-coffee-cream/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              ref={titleRef} 
              className={cn(
                "transition-all duration-700 transform",
                titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-coffee-dark">
                Temukan kopi terbaik
              </h2>
            </div>
            
            <div 
              ref={contentRef}
              className={cn(
                "transition-all duration-700 transform",
                contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <p className="text-base md:text-lg mb-6 text-gray-700">
                Malam Caffe adalah tempat di mana passion bertemu dengan kualitas. Kami memilih biji kopi terbaik dari seluruh Indonesia dan dunia untuk memberikan Anda pengalaman kopi yang tak terlupakan setiap hari.
              </p>
              
              <p className="text-base md:text-lg mb-8 text-gray-700">
                Dari Aceh hingga Papua, kami bekerja langsung dengan petani kopi untuk memastikan setiap cangkir kopi yang Anda nikmati memiliki cerita di baliknya. Inilah alasan mengapa Malam Caffe menjadi pilihan pecinta kopi sejati.
              </p>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className={cn(
              "transition-all duration-700 transform",
              imageInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Biji kopi premium" 
                className="rounded-2xl shadow-lg image-zoom"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md">
                <img 
                  src="/espre.png" 
                  alt="Kopi pilihan" 
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
