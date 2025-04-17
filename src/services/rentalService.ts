
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface RentalItem {
  productId: string;
  rentalPeriodId: string;
  sizeId?: string;
  colorId?: string;
}

export const createRental = async (rentalItem: RentalItem) => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      throw new Error("You must be signed in to rent an item");
    }
    
    const { error } = await supabase.from("rentals").insert({
      user_id: userData.user.id,
      product_id: rentalItem.productId,
      rental_period_id: rentalItem.rentalPeriodId,
      size_id: rentalItem.sizeId,
      color_id: rentalItem.colorId,
      status: "pending"
    });

    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error("Error creating rental:", error);
    toast({
      variant: "destructive",
      title: "Rental failed",
      description: error.message,
    });
    return { success: false, error };
  }
};

export const getUserRentals = async () => {
  try {
    const { data, error } = await supabase
      .from("rentals")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return { data };
  } catch (error: any) {
    console.error("Error fetching rentals:", error);
    return { error };
  }
};

export const getMerchantRentals = async (merchantId: string) => {
  try {
    const { data, error } = await supabase
      .from("rentals")
      .select(`
        *,
        merchant_products:product_id (
          id,
          name,
          price,
          merchant_id
        )
      `)
      .eq("merchant_products.merchant_id", merchantId)
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return { data };
  } catch (error: any) {
    console.error("Error fetching merchant rentals:", error);
    return { error };
  }
};

export const updateRentalStatus = async (rentalId: string, status: string) => {
  try {
    const { error } = await supabase
      .from("rentals")
      .update({ status })
      .eq("id", rentalId);
      
    if (error) throw error;
    
    toast({
      title: "Status updated",
      description: `Order status has been updated to ${status}.`,
    });
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating rental status:", error);
    toast({
      variant: "destructive",
      title: "Update failed",
      description: error.message,
    });
    return { success: false, error };
  }
};
