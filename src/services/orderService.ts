
import { CartItem, CheckoutFormData, Order } from '@/types/coffee';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Midtrans client key (should be replaced with actual sandbox key)
const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-xxxxxxxx';

/**
 * Create a new order and open payment gateway
 */
export const createOrder = async (
  cartItems: CartItem[],
  totalPrice: number,
  shippingInfo: CheckoutFormData
): Promise<Order> => {
  try {
    // Generate order ID
    const orderId = uuidv4();
    
    // Prepare order data
    const orderData: Order = {
      id: orderId,
      user_id: 'guest', // In a real system, could use user ID if logged in
      items: cartItems,
      total_price: totalPrice,
      status: 'pending',
      created_at: new Date().toISOString(),
      shipping_address: {
        name: shippingInfo.name,
        email: shippingInfo.email,
        address: shippingInfo.address,
        city: shippingInfo.city,
        postal_code: shippingInfo.postal_code,
        phone: shippingInfo.phone
      }
    };

    // Save order data to Supabase
    const { error } = await supabase
      .from('orders')
      .insert(orderData);

    if (error) throw new Error('Failed to save order: ' + error.message);

    // Get Midtrans token
    const midtransToken = await getMidtransToken(orderData);
    
    // Open Midtrans Snap
    openMidtransSnap(midtransToken);

    return orderData;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Get Midtrans token by calling backend API
 */
const getMidtransToken = async (orderData: Order): Promise<string> => {
  try {
    // In a real implementation, this would call your backend API
    // For sandbox testing, we're simulating the token response
    
    // Log the request that would be sent to backend
    console.log('Midtrans token request data:', {
      orderId: orderData.id,
      amount: orderData.total_price,
      customerDetails: {
        firstName: orderData.shipping_address?.name || 'Guest',
        email: orderData.shipping_address?.email || 'guest@example.com',
        phone: orderData.shipping_address?.phone || '-'
      },
      items: orderData.items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      }))
    });
    
    // For demo purposes, we'll return a fake token
    // In production, this should be a real API call
    return 'fake-midtrans-token-' + orderData.id;
  } catch (error) {
    console.error('Error getting Midtrans token:', error);
    throw error;
  }
};

/**
 * Load Midtrans Snap.js script dynamically
 */
const loadMidtransScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
};

/**
 * Open Midtrans Snap with the token
 */
const openMidtransSnap = async (token: string) => {
  try {
    // Make sure script is loaded
    await loadMidtransScript();
    
    // Check if snap is available
    if (window.snap) {
      window.snap.pay(token, {
        onSuccess: function(result: any) {
          console.log('Payment success:', result);
          // Logic to update order status could be added here
        },
        onPending: function(result: any) {
          console.log('Payment pending:', result);
        },
        onError: function(result: any) {
          console.error('Payment error:', result);
        },
        onClose: function() {
          console.log('Customer closed the popup without finishing the payment');
        }
      });
    } else {
      // For demo purposes, just show what would happen
      console.log('Midtrans Snap would open with token:', token);
      alert('Payment simulation: In a real app, the Midtrans payment popup would appear here.');
    }
  } catch (error) {
    console.error('Error opening Midtrans Snap:', error);
    throw error;
  }
};

/**
 * Get order details by ID
 */
export const getOrderDetails = async (orderId: string): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
};
