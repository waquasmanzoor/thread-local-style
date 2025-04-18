
import { supabase } from "@/integrations/supabase/client";

export const createRazorpayOrder = async (amount: number, rentalId: string) => {
  try {
    // In a real-world scenario, this would be an Edge Function calling Razorpay's API securely
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('payments')
      .insert({
        user_id: user.user.id,
        rental_id: rentalId,
        amount: amount,
        currency: 'INR',
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    // This is a mock implementation. In production, you'd generate an order ID from Razorpay
    return {
      id: data.id,
      amount: amount,
      currency: 'INR'
    };
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

export const updatePaymentStatus = async (paymentId: string, status: string, razorpayPaymentId?: string) => {
  try {
    const { error } = await supabase
      .from('payments')
      .update({ 
        status, 
        razorpay_payment_id: razorpayPaymentId 
      })
      .eq('id', paymentId);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};
