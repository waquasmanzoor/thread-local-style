
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

export const createRazorpayOrder = async (amount: number, rentalInfo: any) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // Generate a valid UUID for rental_id
    const rentalId = uuidv4();
    
    // Create a payment record in Supabase
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

    // In a real-world scenario, this would be an Edge Function calling Razorpay's API
    return {
      id: data.id,
      amount: amount,
      currency: 'INR',
      razorpay_key: import.meta.env.VITE_RAZORPAY_KEY_ID
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
