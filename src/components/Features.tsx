
import { Coffee, Award, Star, DollarSign } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Coffee className="h-10 w-10 text-coffee" />,
    title: 'Biji Pilihan',
    description: 'Hanya biji kopi terbaik dari petani pilihan yang lolos seleksi ketat kami'
  },
  {
    icon: <Award className="h-10 w-10 text-coffee" />,
    title: 'Kualitas Tinggi',
    description: 'Standar kualitas internasional untuk setiap cangkir kopi yang kami sajikan'
  },
  {
    icon: <Star className="h-10 w-10 text-coffee" />,
    title: 'Rasa Istimewa',
    description: 'Profil rasa unik dari berbagai daerah di Indonesia dan dunia'
  },
  {
    icon: <DollarSign className="h-10 w-10 text-coffee" />,
    title: 'Harga Terjangkau',
    description: 'Kualitas premium dengan harga yang ramah di kantong'
  }
];

const Features = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-coffee-cream">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-coffee-dark mb-2">
            Mengapa kami berbeda?
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Keunggulan yang membuat Malam Caffe menjadi pilihan pecinta kopi
          </p>
        </div>
        
        <div 
          ref={featuresRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700",
            featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm border border-coffee/10 hover:shadow-md transition-all duration-300 text-center"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coffee-cream mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-3 text-coffee-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
