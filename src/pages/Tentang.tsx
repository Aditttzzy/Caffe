
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Coffee, Clock, Users, MapPin } from 'lucide-react';

const Tentang = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />

      <div className="pt-24 md:pt-32">
        {/* Hero Section */}
        <div 
          ref={heroRef}
          className={cn(
            "relative py-20 mb-16 transition-all duration-700",
            heroInView ? "opacity-100" : "opacity-0"
          )}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-coffee-dark/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Tentang Kami</h1>
            <p className="text-xl max-w-2xl mx-auto text-white/90">
              Malam Caffe adalah sebuah perjalanan cinta terhadap kopi dan budaya Indonesia
            </p>
          </div>
        </div>
        
        {/* Our Story Section */}
        <div 
          ref={storyRef}
          className={cn(
            "container mx-auto px-4 mb-20 transition-all duration-700 transform",
            storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-coffee-dark">
                Cerita Kami
              </h2>
              <p className="text-gray-700 mb-4">
                Malam Caffe didirikan pada tahun 2015 oleh sekelompok pecinta kopi yang berkomitmen untuk membawa pengalaman kopi premium dengan sentuhan lokal Indonesia. Kami memulai perjalanan ini di sebuah sudut kecil di Kota Pekanbaru, dan kini telah berkembang dengan beberapa cabang di seluruh kota.
              </p>
              <p className="text-gray-700 mb-4">
                Nama "Malam Caffe" terinspirasi dari tradisi masyarakat Indonesia yang suka menikmati kopi di malam hari sambil berbincang dengan keluarga dan teman. Kami ingin menciptakan tempat yang nyaman di mana orang dapat merasakan kehangatan dan kenikmatan kopi berkualitas tinggi.
              </p>
              <p className="text-gray-700 mb-4">
                Kami berkomitmen untuk bekerja langsung dengan petani kopi lokal, mendukung praktik pertanian berkelanjutan, dan memastikan bahwa setiap cangkir kopi yang kami sajikan memiliki kualitas terbaik.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Cerita Malam Caffe" 
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-5 -right-5 bg-coffee-cream p-4 rounded-lg shadow-md w-32 h-32 flex flex-col items-center justify-center text-center">
                <span className="text-coffee-dark font-display font-bold text-3xl">8+</span>
                <span className="text-sm text-coffee">Tahun Pengalaman</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="bg-coffee-cream/50 py-16">
          <div 
            ref={valuesRef}
            className={cn(
              "container mx-auto px-4 transition-all duration-700 transform",
              valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-coffee-dark text-center">
              Nilai-Nilai Kami
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee/10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coffee-cream mb-5">
                  <Coffee className="h-8 w-8 text-coffee" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-coffee-dark">Kualitas Tanpa Kompromi</h3>
                <p className="text-gray-600">Kami hanya menggunakan biji kopi terbaik dan metode pembuatan yang presisi untuk hasil optimal.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee/10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coffee-cream mb-5">
                  <Users className="h-8 w-8 text-coffee" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-coffee-dark">Komunitas</h3>
                <p className="text-gray-600">Kami menciptakan ruang yang nyaman bagi orang untuk berkumpul, bertukar pikiran, dan menikmati kebersamaan.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee/10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coffee-cream mb-5">
                  <MapPin className="h-8 w-8 text-coffee" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-coffee-dark">Lokal & Berkelanjutan</h3>
                <p className="text-gray-600">Kami mendukung petani lokal dan praktik pertanian yang bertanggung jawab terhadap lingkungan.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee/10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coffee-cream mb-5">
                  <Clock className="h-8 w-8 text-coffee" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-coffee-dark">Inovasi</h3>
                <p className="text-gray-600">Kami terus belajar dan mengembangkan teknik baru untuk meningkatkan pengalaman kopi Anda.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div 
          ref={teamRef}
          className={cn(
            "container mx-auto px-4 py-20 transition-all duration-700 transform",
            teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-coffee-dark text-center">
            Tim Kami
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Budi Setiawan",
                role: "Founder & Head Barista",
                image: "https://randomuser.me/api/portraits/men/41.jpg",
                bio: "Budi memiliki pengalaman 15 tahun dalam dunia kopi dan telah memenangkan berbagai kompetisi barista nasional."
              },
              {
                name: "Siti Rahayu",
                role: "Coffee Sourcer",
                image: "https://randomuser.me/api/portraits/women/45.jpg",
                bio: "Siti berkeliling Indonesia untuk menemukan biji kopi terbaik dan membangun hubungan dengan petani lokal."
              },
              {
                name: "Reza Pratama",
                role: "Executive Chef",
                image: "https://randomuser.me/api/portraits/men/36.jpg",
                bio: "Reza menciptakan menu makanan yang sempurna untuk melengkapi pengalaman kopi di Malam Caffe."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-coffee-dark">{member.name}</h3>
                  <p className="text-coffee mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="coffee-button">Bergabung Dengan Tim Kami</Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Tentang;
