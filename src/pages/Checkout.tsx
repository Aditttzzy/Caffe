
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { CheckoutFormData } from '@/types/coffee';
import { createOrder } from '@/services/orderService';

// Skema validasi formulir checkout
const checkoutSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus minimal 3 karakter' }),
  email: z.string().email({ message: 'Email tidak valid' }),
  address: z.string().min(5, { message: 'Alamat harus minimal 5 karakter' }),
  city: z.string().min(3, { message: 'Kota harus minimal 3 karakter' }),
  postal_code: z.string().regex(/^\d{5}$/, { message: 'Kode pos harus 5 digit angka' }),
  phone: z.string().regex(/^(\+62|62|0)[0-9]{9,12}$/, { message: 'Nomor telepon tidak valid' })
});

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Memformat harga dalam Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  // Inisialisasi form
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postal_code: "",
      phone: ""
    }
  });

  // Handle submit form
  const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
    if (cartItems.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Silakan tambahkan produk ke keranjang terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Buat data pesanan
      const shippingInfo: CheckoutFormData = {
        name: data.name,
        email: data.email,
        address: data.address,
        city: data.city,
        postal_code: data.postal_code,
        phone: data.phone
      };
      
      // Panggil service untuk membuat pesanan
      const order = await createOrder(cartItems, totalPrice, shippingInfo);
      
      // Jika berhasil, bersihkan keranjang dan redirect ke halaman sukses
      clearCart();
      navigate(`/order-success/${order.id}`);
      
    } catch (error) {
      console.error('Error processing checkout:', error);
      toast({
        title: "Gagal memproses pembayaran",
        description: "Terjadi kesalahan saat memproses pembayaran, silakan coba lagi",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-20">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-display font-bold text-coffee-dark">Checkout</h1>
          </div>
          
          <div className="p-6 md:grid md:grid-cols-3 md:gap-6">
            {/* Form Pengiriman */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-medium text-coffee-dark mb-6">Detail Pengiriman</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nama lengkap" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="contoh@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan alamat lengkap" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kota</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama kota" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="postal_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kode Pos</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor Telepon</FormLabel>
                          <FormControl>
                            <Input placeholder="08xxxxxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4 md:hidden">
                    <h2 className="text-xl font-medium text-coffee-dark mb-4">Ringkasan Pesanan</h2>
                    <div className="border-t border-b border-gray-200 py-4 space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                          <span className="text-gray-600">
                            {item.product.name} x {item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-xl font-bold text-coffee-dark">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="coffee-button w-full md:w-auto" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Memproses..." : "Lanjut ke Pembayaran"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            
            {/* Ringkasan Pesanan (Desktop) */}
            <div className="hidden md:block bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-medium text-coffee-dark mb-6">Ringkasan Pesanan</h2>
              
              <div className="space-y-4 border-b border-gray-200 pb-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} x {formatPrice(item.product.price)}</p>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pengiriman</span>
                  <span className="font-medium">Gratis</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-xl font-bold text-coffee-dark">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
