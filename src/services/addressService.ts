
import { supabase } from '@/integrations/supabase/client';

export interface DeliveryAddress {
  id: string;
  user_id: string;
  street_address: string;
  apartment: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export const createAddress = async (address: Omit<DeliveryAddress, "id" | "created_at" | "updated_at" | "user_id">) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('Not authenticated');
  }
  
  const { data, error } = await supabase
    .from('delivery_addresses')
    .insert({
      user_id: user.user.id,
      street_address: address.street_address,
      apartment: address.apartment,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country || 'United States',
      is_default: address.is_default || false,
    })
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return { data, error };
};

export const getUserAddresses = async () => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('Not authenticated');
  }
  
  const { data, error } = await supabase
    .from('delivery_addresses')
    .select('*')
    .eq('user_id', user.user.id)
    .order('is_default', { ascending: false });
  
  if (error) {
    throw error;
  }
  
  return { data, error };
};

export const updateAddress = async (id: string, address: Partial<Omit<DeliveryAddress, "id" | "created_at" | "updated_at" | "user_id">>) => {
  const { data, error } = await supabase
    .from('delivery_addresses')
    .update(address)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return { data, error };
};

export const deleteAddress = async (id: string) => {
  const { error } = await supabase
    .from('delivery_addresses')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw error;
  }
  
  return { success: true };
};

export const setDefaultAddress = async (id: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('Not authenticated');
  }
  
  // First, set all addresses for this user to not default
  const { error: resetError } = await supabase
    .from('delivery_addresses')
    .update({ is_default: false })
    .eq('user_id', user.user.id);
  
  if (resetError) {
    throw resetError;
  }
  
  // Then set the selected address as default
  const { data, error } = await supabase
    .from('delivery_addresses')
    .update({ is_default: true })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return { data, error };
};
