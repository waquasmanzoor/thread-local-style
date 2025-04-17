
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Merchant {
  id: string;
  user_id: string;
  store_name: string;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MerchantProduct {
  id: string;
  merchant_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  available_for_rent: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Get current merchant profile
export const getMerchantProfile = async () => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      throw new Error("Not authenticated");
    }
    
    const { data, error } = await supabase
      .from("merchants")
      .select("*")
      .eq("user_id", userData.user.id)
      .single();
      
    if (error) throw error;
    return { data: data as Merchant };
  } catch (error: any) {
    console.error("Error fetching merchant profile:", error);
    return { error };
  }
};

// Create a merchant profile
export const createMerchantProfile = async (merchantData: Omit<Merchant, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      throw new Error("Not authenticated");
    }
    
    const { data, error } = await supabase
      .from("merchants")
      .insert({
        user_id: userData.user.id,
        store_name: merchantData.store_name,
        description: merchantData.description,
        logo_url: merchantData.logo_url
      })
      .select()
      .single();
      
    if (error) throw error;
    
    toast({
      title: "Merchant profile created",
      description: "Your merchant profile has been created successfully.",
    });
    
    return { data: data as Merchant };
  } catch (error: any) {
    console.error("Error creating merchant profile:", error);
    toast({
      variant: "destructive",
      title: "Failed to create merchant profile",
      description: error.message,
    });
    return { error };
  }
};

// Update merchant profile
export const updateMerchantProfile = async (merchantId: string, merchantData: Partial<Merchant>) => {
  try {
    const { data, error } = await supabase
      .from("merchants")
      .update(merchantData)
      .eq("id", merchantId)
      .select()
      .single();
      
    if (error) throw error;
    
    toast({
      title: "Profile updated",
      description: "Your merchant profile has been updated successfully.",
    });
    
    return { data: data as Merchant };
  } catch (error: any) {
    console.error("Error updating merchant profile:", error);
    toast({
      variant: "destructive",
      title: "Failed to update profile",
      description: error.message,
    });
    return { error };
  }
};

// Get merchant products
export const getMerchantProducts = async (merchantId: string) => {
  try {
    const { data, error } = await supabase
      .from("merchant_products")
      .select("*")
      .eq("merchant_id", merchantId)
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return { data: data as MerchantProduct[] };
  } catch (error: any) {
    console.error("Error fetching merchant products:", error);
    return { error };
  }
};

// Create a new product
export const createProduct = async (product: Omit<MerchantProduct, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from("merchant_products")
      .insert(product)
      .select()
      .single();
      
    if (error) throw error;
    
    toast({
      title: "Product created",
      description: "Your product has been created successfully.",
    });
    
    return { data: data as MerchantProduct };
  } catch (error: any) {
    console.error("Error creating product:", error);
    toast({
      variant: "destructive",
      title: "Failed to create product",
      description: error.message,
    });
    return { error };
  }
};

// Update a product
export const updateProduct = async (productId: string, productData: Partial<MerchantProduct>) => {
  try {
    const { data, error } = await supabase
      .from("merchant_products")
      .update(productData)
      .eq("id", productId)
      .select()
      .single();
      
    if (error) throw error;
    
    toast({
      title: "Product updated",
      description: "Your product has been updated successfully.",
    });
    
    return { data: data as MerchantProduct };
  } catch (error: any) {
    console.error("Error updating product:", error);
    toast({
      variant: "destructive",
      title: "Failed to update product",
      description: error.message,
    });
    return { error };
  }
};

// Delete a product
export const deleteProduct = async (productId: string) => {
  try {
    const { error } = await supabase
      .from("merchant_products")
      .delete()
      .eq("id", productId);
      
    if (error) throw error;
    
    toast({
      title: "Product deleted",
      description: "Your product has been deleted successfully.",
    });
    
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    toast({
      variant: "destructive",
      title: "Failed to delete product",
      description: error.message,
    });
    return { error };
  }
};

// Get orders for a merchant
export const getMerchantRentals = async (merchantId: string) => {
  try {
    const { data, error } = await supabase
      .from("rentals")
      .select(`
        *,
        merchant_products!inner(
          *,
          merchants!inner(id)
        )
      `)
      .eq("merchant_products.merchants.id", merchantId)
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return { data };
  } catch (error: any) {
    console.error("Error fetching merchant rentals:", error);
    return { error };
  }
};
