
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fungsi untuk memformat harga dalam Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-20">
        <div 
          ref={ref}
          className={cn(
            "bg-white rounded-lg shadow-md p-6 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h1 className="text-3xl font-display font-bold mb-8 text-coffee-dark">Keranjang Belanja</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-medium text-gray-600 mb-4">Keranjang Anda Kosong</h2>
              <p className="text-gray-500 mb-6">Anda belum menambahkan produk ke keranjang</p>
              <Link to="/menu">
                <Button className="coffee-button">Lihat Menu</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b-2 border-gray-100">
                    <tr>
                      <th className="text-left py-4 px-4 text-gray-600">Produk</th>
                      <th className="text-center py-4 px-4 text-gray-600">Harga</th>
                      <th className="text-center py-4 px-4 text-gray-600">Jumlah</th>
                      <th className="text-center py-4 px-4 text-gray-600">Subtotal</th>
                      <th className="text-right py-4 px-4 text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cartItems.map((item) => {
                      const subtotal = item.product.price * item.quantity;
                      
                      return (
                        <tr key={item.product.id} className="group hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md mr-4">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-coffee-dark">{item.product.name}</h3>
                                <p className="text-sm text-gray-500">{item.product.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center text-gray-700">
                            {formatPrice(item.product.price)}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center font-medium text-coffee">
                            {formatPrice(subtotal)}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-gray-100 pt-6">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-600">
                    Total {totalItems} item
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center justify-between mb-4 w-full md:w-auto">
                    <span className="text-gray-600 mr-4 font-medium">Total:</span>
                    <span className="text-2xl font-bold text-coffee-dark">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex space-x-4">
                    <Link to="/menu">
                      <Button variant="outline" className="border-coffee text-coffee hover:bg-coffee-cream">
                        Lanjut Belanja
                      </Button>
                    </Link>
                    <Link to="/checkout">
                      <Button className="coffee-button">
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
