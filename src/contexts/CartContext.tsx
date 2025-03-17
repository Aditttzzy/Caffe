
import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartItem, CoffeeProduct } from '@/types/coffee';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CoffeeProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('malam-caffe-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('malam-caffe-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CoffeeProduct, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Check if we have enough stock
        if (existingItem.quantity + quantity > product.stock) {
          toast({
            title: "Stok tidak mencukupi",
            description: `Hanya tersisa ${product.stock} ${product.name}`,
            variant: "destructive"
          });
          return prevItems;
        }
        
        // Item exists, update quantity
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Check if we have enough stock
        if (quantity > product.stock) {
          toast({
            title: "Stok tidak mencukupi",
            description: `Hanya tersisa ${product.stock} ${product.name}`,
            variant: "destructive"
          });
          return prevItems;
        }
        
        // Add new item
        toast({
          title: "Ditambahkan ke keranjang",
          description: `${product.name} telah ditambahkan ke keranjang`
        });
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => {
      const product = prevItems.find(item => item.product.id === productId)?.product;
      
      if (product && quantity > product.stock) {
        toast({
          title: "Stok tidak mencukupi",
          description: `Hanya tersisa ${product.stock} ${product.name}`,
          variant: "destructive"
        });
        return prevItems;
      }
      
      return prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate totals
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
