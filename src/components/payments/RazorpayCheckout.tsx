import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, CreditCard, Shield, CheckCircle } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  amount: number;
  orderId?: string;
  description?: string;
  onSuccess?: (paymentData: any) => void;
  onFailure?: (error: any) => void;
  className?: string;
  buttonText?: string;
  variant?: 'default' | 'accent';
}

export function RazorpayCheckout({
  amount,
  orderId,
  description = 'InduCycle Hub Payment',
  onSuccess,
  onFailure,
  className,
  buttonText = 'Pay Now',
  variant = 'accent',
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Failed to load Razorpay SDK');

      // Create order via edge function
      const { data, error } = await supabase.functions.invoke('razorpay-create-order', {
        body: {
          amount,
          currency: 'INR',
          receipt: orderId ? `order_${orderId}` : `rcpt_${Date.now()}`,
          notes: { orderId, description },
        },
      });

      if (error || !data?.orderId) {
        throw new Error(error?.message || data?.error || 'Failed to create payment order');
      }

      // Open Razorpay checkout
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'InduCycle Hub',
        description,
        order_id: data.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('razorpay-verify', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderId,
              },
            });

            if (verifyError || !verifyData?.verified) {
              throw new Error('Payment verification failed');
            }

            toast.success('Payment successful! 🎉');
            onSuccess?.(response);
          } catch (e: any) {
            toast.error('Payment verification failed');
            onFailure?.(e);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#1E3A5F',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info('Payment cancelled');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        toast.error(`Payment failed: ${response.error.description}`);
        onFailure?.(response.error);
      });
      rzp.open();
    } catch (e: any) {
      toast.error(e.message || 'Payment failed');
      onFailure?.(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className={`${variant === 'accent' ? 'gradient-accent text-accent-foreground' : 'gradient-primary text-primary-foreground'} ${className}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <CreditCard className="h-4 w-4 mr-2" />
      )}
      {buttonText}
    </Button>
  );
}
