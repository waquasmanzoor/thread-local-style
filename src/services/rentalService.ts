
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
