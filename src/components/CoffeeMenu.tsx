
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { CoffeeProduct } from '@/types/coffee';
import { useCart } from '@/contexts/CartContext';

const coffeeItems: CoffeeProduct[] = [
  {
    id: "cappuccino-1",
    name: 'Cappuccino',
    description: 'Kopi espresso dengan susu dan foam yang creamy',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: "Espresso Based",
    stock: 20
  },
  {
    id: "latte-1",
    name: 'Cafe Latte',
    description: 'Espresso yang lembut dengan susu yang creamy',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: "Espresso Based",
    stock: 20
  },
  {
    id: "macchiato-1",
    name: 'Macchiato',
    description: 'Espresso dengan sedikit milk foam di atasnya',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: "Espresso Based",
    stock: 20
  },
  {
    id: "espresso-1",
    name: 'Espresso',
    description: 'Hitam, kental, dan kaya aroma, authentic Italian',
    price: 28000,
    image: '/espre.png',
    category: "Espresso Based",
    stock: 20
  },
];

const CoffeeMenu = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { addToCart, cartItems, updateQuantity } = useCart();

  // Format harga dalam Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  // Mendapatkan kuantitas item di keranjang
  const getItemQuantity = (productId: string) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-coffee-dark">
            Nikmati variasi kopi favorit
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Eksplorasi berbagai jenis kopi spesial kami yang dibuat dengan hati dan keahlian barista profesional. Setiap cangkir memiliki karakter dan cerita unik.
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700",
            cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {coffeeItems.map((coffee, index) => {
            const quantity = getItemQuantity(coffee.id);
            
            return (
              <div 
                key={coffee.id} 
                className="coffee-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={coffee.image} 
                    alt={coffee.name} 
                    className="w-full h-full object-cover image-zoom"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-2 text-coffee-dark">
                    {coffee.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{coffee.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-coffee font-bold">{formatPrice(coffee.price)}</span>
                    
                    {quantity > 0 ? (
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(coffee.id, quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{quantity}</span>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(coffee.id, quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="text-coffee border-coffee hover:bg-coffee-cream flex items-center space-x-2"
                        onClick={() => addToCart(coffee)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Pesan</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="coffee-button" 
            onClick={() => window.location.href = '/menu'}
          >
            Lihat Semua Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoffeeMenu;
