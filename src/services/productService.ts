
import { Product } from "@/types";
import { supabase } from "@/integrations/supabase/client";

// Mock data for development
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Designer Handbag",
    brand: "Luxury Brand",
    image: "/placeholder.svg",
    price: 45,
    retailPrice: 2200,
    rentalPeriod: "per day"
  },
  {
    id: "2",
    name: "Formal Dress",
    brand: "Fashion House",
    image: "/placeholder.svg",
    price: 75,
    retailPrice: 950,
    rentalPeriod: "per event"
  },
  {
    id: "3",
    name: "Men's Suit",
    brand: "Tailored Elegance",
    image: "/placeholder.svg",
    price: 65,
    retailPrice: 1200,
    rentalPeriod: "per day",
    isNew: true
  },
  {
    id: "4",
    name: "Evening Gown",
    brand: "Red Carpet",
    image: "/placeholder.svg",
    price: 95,
    retailPrice: 1800,
    rentalPeriod: "per event"
  },
  {
    id: "5",
    name: "Smart Watch",
    brand: "Tech Luxury",
    image: "/placeholder.svg",
    price: 25,
    retailPrice: 450,
    rentalPeriod: "per day",
    isNew: true
  },
  {
    id: "6",
    name: "Diamond Necklace",
    brand: "Fine Jewelers",
    image: "/placeholder.svg",
    price: 120,
    retailPrice: 3500,
    rentalPeriod: "per event"
  },
  {
    id: "7",
    name: "Camera Equipment",
    brand: "Pro Photography",
    image: "/placeholder.svg",
    price: 55,
    retailPrice: 1200,
    rentalPeriod: "per day"
  },
  {
    id: "8",
    name: "Designer Shoes",
    brand: "Fashion Steps",
    image: "/placeholder.svg",
    price: 35,
    retailPrice: 780,
    rentalPeriod: "per event",
    isNew: true
  },
];

export const getAllProducts = async (): Promise<Product[]> => {
  // In a real app, this would fetch from Supabase
  // const { data, error } = await supabase.from('products').select('*');
  // if (error) throw error;
  // return data;
  
  return mockProducts;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  // In a real app, this would fetch from Supabase
  // const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  // if (error) throw error;
  // return data;
  
  return mockProducts.find(product => product.id === id);
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  // In a real app, this would fetch from Supabase with category filter
  // const { data, error } = await supabase.from('products').select('*').eq('category_id', categoryId);
  // if (error) throw error;
  // return data;
  
  // For demo, return all products as if they're in the category
  return mockProducts;
};
