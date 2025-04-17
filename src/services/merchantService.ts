
import { supabase } from '@/integrations/supabase/client';

export interface Merchant {
  id: string;
  user_id: string;
  store_name: string;
  description: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MerchantProduct {
  id: string;
  merchant_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string;
  available_for_rent: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MerchantRental {
  id: string;
  product_id: string;
  user_id: string;
  rental_period_id: string;
  size_id: string | null;
  color_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  rental_start_date?: string;
  rental_end_date?: string;
  merchant_products: {
    id: string;
    name: string;
    price: number;
  };
}

export const getMerchantProfile = async () => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('Not authenticated');
  }
  
  const { data, error } = await supabase
    .from('merchants')
    .select('*')
    .eq('user_id', user.user.id)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" - this is OK if the user doesn't have a merchant profile yet
    throw error;
  }
  
  return { data, error };
};

export const createMerchantProfile = async (profile: Omit<Merchant, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('Not authenticated');
  }
  
  const { data, error } = await supabase
    .from('merchants')
    .insert({
      user_id: user.user.id,
      store_name: profile.store_name,
      description: profile.description || '',
      logo_url: profile.logo_url || null,
    })
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return { data, error };
};

export const updateMerchantProfile = async (id: string, profile: Partial<Omit<Merchant, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('merchants')
    .update({
      store_name: profile.store_name,
      description: profile.description || '',
      logo_url: profile.logo_url || null,
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return { data, error };
};

export const createMerchantProduct = async (product: Omit<MerchantProduct, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('merchant_products')
    .insert({
      merchant_id: product.merchant_id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      image_url: product.image_url || null,
      category: product.category || '',
      available_for_rent: product.available_for_rent,
      is_active: product.is_active,
    })
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return { data, error };
};

export const updateMerchantProduct = async (id: string, product: Partial<Omit<MerchantProduct, 'id' | 'created_at' | 'updated_at'>>) => {
  const updates: any = {};
  
  // Only include fields that are provided
  if (product.name !== undefined) updates.name = product.name;
  if (product.description !== undefined) updates.description = product.description;
  if (product.price !== undefined) updates.price = product.price;
  if (product.image_url !== undefined) updates.image_url = product.image_url;
  if (product.category !== undefined) updates.category = product.category;
  if (product.available_for_rent !== undefined) updates.available_for_rent = product.available_for_rent;
  if (product.is_active !== undefined) updates.is_active = product.is_active;
  
  const { data, error } = await supabase
    .from('merchant_products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return { data, error };
};

export const deleteMerchantProduct = async (id: string) => {
  const { error } = await supabase
    .from('merchant_products')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw error;
  }
  
  return { success: true };
};

export const getMerchantProducts = async (merchantId: string) => {
  const { data, error } = await supabase
    .from('merchant_products')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });
  
  if (error) {
    throw error;
  }
  
  return { data, error };
};

export const getMerchantRentals = async (merchantId: string) => {
  const { data, error } = await supabase
    .from('rentals')
    .select(`
      *,
      merchant_products:product_id (
        id,
        name,
        price
      )
    `)
    .eq('merchant_products.merchant_id', merchantId);
  
  if (error) {
    throw error;
  }
  
  return { data: data as MerchantRental[], error };
};
