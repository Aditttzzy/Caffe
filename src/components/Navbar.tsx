
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Tentang', path: '/tentang' },
    { name: 'Kontak', path: '/kontak' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-coffee-dark dark:text-coffee-light"
        >
          <Coffee className="h-8 w-8" />
          <span className="text-2xl font-display font-bold">Malam Caffe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'nav-link text-base font-medium',
                isActive(link.path) && 'nav-link-active'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="hover:bg-coffee-cream dark:hover:bg-coffee-black/20">
              <ShoppingCart className="h-5 w-5 text-coffee-dark dark:text-coffee-light" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-coffee text-white min-w-5 h-5 flex items-center justify-center rounded-full text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/menu">
            <Button className="coffee-button">Pesan Sekarang</Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="hover:bg-coffee-cream dark:hover:bg-coffee-black/20">
              <ShoppingCart className="h-5 w-5 text-coffee-dark dark:text-coffee-light" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-coffee text-white min-w-5 h-5 flex items-center justify-center rounded-full text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          <button
            className="p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-coffee-dark dark:text-coffee-light" />
            ) : (
              <Menu className="h-6 w-6 text-coffee-dark dark:text-coffee-light" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'fixed left-0 right-0 top-[72px] bg-background shadow-lg md:hidden transition-transform duration-300 ease-in-out transform',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'py-2 px-4 text-lg font-medium nav-link',
                isActive(link.path) && 'nav-link-active'
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/menu" onClick={() => setIsOpen(false)}>
            <Button className="coffee-button mt-4 w-full">Pesan Sekarang</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
