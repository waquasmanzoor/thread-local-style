
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

export const createRazorpayOrder = async (amount: number, rentalInfo: any) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // First, create a rental record in the rentals table
    const rentalId = uuidv4();
    const { error: rentalError } = await supabase
      .from('rentals')
      .insert({
        id: rentalId,
        user_id: user.user.id,
        product_id: rentalInfo.items[0].id, // Using the first item's ID
        rental_period_id: rentalInfo.items[0].rentalPeriod,
        status: 'pending'
      });
      
    if (rentalError) throw rentalError;
    
    // Now create a payment record linked to the rental
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
    
    // Also update the rental status
    const { data: paymentData } = await supabase
      .from('payments')
      .select('rental_id')
      .eq('id', paymentId)
      .single();
    
    if (paymentData?.rental_id) {
      await supabase
        .from('rentals')
        .update({ status: status === 'completed' ? 'confirmed' : status })
        .eq('id', paymentData.rental_id);
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};
