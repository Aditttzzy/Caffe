
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-coffee-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Coffee className="h-8 w-8" />
              <span className="text-2xl font-display font-bold">Malam Caffe</span>
            </Link>
            <p className="text-white/70 mb-6">
              Tempat di mana kopi premium bertemu dengan suasana yang nyaman. Nikmati setiap cangkir kopi kami yang disajikan dengan passion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Tentang</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tentang" className="text-white/70 hover:text-white transition-colors duration-200">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-white/70 hover:text-white transition-colors duration-200">
                  Menu Kami
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-colors duration-200">
                  Blog & Artikel
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="text-white/70 hover:text-white transition-colors duration-200">
                  Galeri
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Perusahaan</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/karir" className="text-white/70 hover:text-white transition-colors duration-200">
                  Karir
                </Link>
              </li>
              <li>
                <Link to="/lokasi" className="text-white/70 hover:text-white transition-colors duration-200">
                  Lokasi Kami
                </Link>
              </li>
              <li>
                <Link to="/partnership" className="text-white/70 hover:text-white transition-colors duration-200">
                  Kemitraan
                </Link>
              </li>
              <li>
                <Link to="/kebijakan-privasi" className="text-white/70 hover:text-white transition-colors duration-200">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-coffee-light" />
                <span className="text-white/70">
                  Jl. Kopi Nikmat No. 123, Pekanbaru, Indonesia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-coffee-light" />
                <span className="text-white/70">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-coffee-light" />
                <span className="text-white/70">info@malamcaffe.id</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-8 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Malam Caffe. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
