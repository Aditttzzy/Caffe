
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

type TestimonialType = {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
};

const testimonials: TestimonialType[] = [
  {
    id: 1,
    content: "Malam Caffe menyajikan kopi terbaik yang pernah saya coba. Rasanya begitu kaya dan aroma khas biji kopi sangrai segar benar-benar terasa. Saya selalu mampir ke sini setiap pagi sebelum bekerja.",
    author: "Andi Pratama",
    role: "Desainer Grafis",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    content: "Saya suka suasana cozy di Malam Caffe. Selain kopinya yang enak, tempat ini juga cocok untuk bekerja atau bertemu dengan klien. WiFi cepat dan makanan pendampingnya juga enak-enak.",
    author: "Lina Wijaya",
    role: "Content Creator",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    content: "Sebagai pencinta kopi, saya sangat memperhatikan kualitas. Malam Caffe tidak pernah mengecewakan. Barista mereka sangat terampil dan selalu konsisten menyajikan kopi dengan kualitas terbaik.",
    author: "Budi Santoso",
    role: "Fotografer",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = testimonials.length - 1;
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Coffee splash decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 -mt-20 -mr-20 transform rotate-45 opacity-10">
        <img 
          src="https://www.pngkey.com/png/full/87-873121_coffee-splatter-png-coffee-splatter-transparent-background.png" 
          alt="Coffee splash" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -mb-20 -ml-20 transform -rotate-45 opacity-10">
        <img 
          src="https://www.pngkey.com/png/full/87-873121_coffee-splatter-png-coffee-splatter-transparent-background.png" 
          alt="Coffee splash" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-coffee-dark mb-2">
            Apa kata mereka
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Berbagai pengalaman luar biasa dari para pelanggan setia kami
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className={cn(
            "max-w-4xl mx-auto transition-all duration-700",
            contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div 
            ref={testimonialsRef} 
            className="relative bg-coffee-cream/30 rounded-2xl p-8 md:p-12 shadow-sm border border-coffee/10"
          >
            <div className="absolute -top-5 left-8 text-coffee-dark opacity-20">
              <Quote size={48} />
            </div>
            
            <div className="relative z-10">
              <div className="transition-opacity duration-500 flex flex-col items-center">
                <p className="text-gray-700 text-lg md:text-xl mb-8 text-center">
                  {testimonials[activeIndex].content}
                </p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].author} 
                    className="w-16 h-16 rounded-full border-2 border-coffee-light"
                  />
                  <div className="ml-4">
                    <h4 className="font-display font-bold text-coffee-dark">
                      {testimonials[activeIndex].author}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
              <button 
                onClick={goToPrev} 
                className="bg-white p-3 rounded-full shadow-md hover:bg-coffee-cream transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-coffee-dark" />
              </button>
            </div>
            
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
              <button 
                onClick={goToNext} 
                className="bg-white p-3 rounded-full shadow-md hover:bg-coffee-cream transition-colors duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-coffee-dark" />
              </button>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === activeIndex 
                      ? "bg-coffee-dark w-6" 
                      : "bg-coffee/30 hover:bg-coffee/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
