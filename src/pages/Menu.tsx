
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { CoffeeProduct } from '@/types/coffee';
import { useCart } from '@/contexts/CartContext';

// Data kopi dengan harga dalam bentuk angka dan menambahkan stock
const coffeeItems: CoffeeProduct[] = [
  {
    id: "espresso-1",
    name: 'Espresso',
    description: 'Shot espresso kental dengan crema yang sempurna',
    price: 28000,
    image: '/espre.png',
    category: 'Espresso Based',
    stock: 20
  },
  {
    id: "americano-1",
    name: 'Americano',
    description: 'Espresso dengan tambahan air panas',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Espresso Based',
    stock: 20
  },
  {
    id: "cappuccino-1",
    name: 'Cappuccino',
    description: 'Espresso dengan steamed milk dan foam yang lembut',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Espresso Based',
    stock: 20
  },
  {
    id: "latte-1",
    name: 'Caffe Latte',
    description: 'Espresso dengan tambahan steamed milk yang creamy',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Espresso Based',
    stock: 20
  },
  {
    id: "flatwhite-1",
    name: 'Flat White',
    description: 'Espresso dengan microfoam milk yang halus',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Espresso Based',
    stock: 20
  },
  {
    id: "macchiato-1",
    name: 'Macchiato',
    description: 'Espresso dengan sentuhan milk foam di atasnya',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Espresso Based',
    stock: 20
  },
  {
    id: "pourover-1",
    name: 'Pour Over',
    description: 'Kopi single origin diseduh dengan teknik V60',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1544312621-79039be3ea54?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Manual Brew',
    stock: 15
  },
  {
    id: "frenchpress-1",
    name: 'French Press',
    description: 'Metode seduh tekan yang menghasilkan kopi kaya',
    price: 33000,
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Manual Brew',
    stock: 15
  }
];

// Mengelompokkan kopi berdasarkan kategori
const coffeeByCategory = coffeeItems.reduce((acc, coffee) => {
  const category = acc.find(cat => cat.title === coffee.category);
  if (category) {
    category.items.push(coffee);
  } else {
    acc.push({
      title: coffee.category,
      items: [coffee]
    });
  }
  return acc;
}, [] as { title: string; items: CoffeeProduct[] }[]);

const Menu = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { addToCart, cartItems, updateQuantity } = useCart();

  // Mendapatkan kuantitas item di keranjang
  const getItemQuantity = (productId: string) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
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
            "relative py-20 mb-12 transition-opacity duration-700",
            headerInView ? "opacity-100" : "opacity-0"
          )}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1523942839745-7848c839b661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-coffee-dark/50" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Menu Kami</h1>
            <p className="text-xl max-w-2xl mx-auto text-white/90">
              Temukan beragam kopi premium dan hidangan pendamping yang siap memanjakan lidah Anda
            </p>
          </div>
        </div>
        
        {/* Menu Content */}
        <div className="container mx-auto px-4 pb-20">
          {coffeeByCategory.map((category, categoryIndex) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
              delay: 100 * categoryIndex,
            });
            
            return (
              <div 
                key={categoryIndex}
                ref={ref}
                className={cn(
                  "mb-16 transition-all duration-700 transform",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                <h2 className="text-3xl font-display font-bold mb-8 text-coffee-dark pb-2 border-b-2 border-coffee/20">
                  {category.title}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {category.items.map((item, itemIndex) => {
                    const quantity = getItemQuantity(item.id);
                    
                    return (
                      <div 
                        key={itemIndex} 
                        className="flex justify-between p-4 hover:bg-coffee-cream/30 rounded-lg transition-colors duration-300"
                      >
                        <div className="flex flex-1">
                          <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden mr-4">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-display font-bold text-coffee-dark">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                            <p className="text-coffee font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {quantity > 0 ? (
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateQuantity(item.id, quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-6 text-center">{quantity}</span>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateQuantity(item.id, quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              onClick={() => addToCart(item)}
                              className="text-coffee border-coffee hover:bg-coffee-cream flex items-center space-x-2"
                              variant="outline"
                              size="sm"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span>Tambah</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Semua kopi kami dapat dibuat dengan pilihan susu: Regular, Low-Fat, Almond, Soy, atau Oat (+Rp 10.000)
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="coffee-button">Pesan Online</Button>
              <Button 
                variant="outline" 
                className="text-coffee border-coffee hover:bg-coffee-cream flex items-center space-x-2"
                onClick={() => window.location.href = '/cart'}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Lihat Keranjang</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Menu;
