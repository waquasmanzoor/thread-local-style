
export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  gender: 'women' | 'men' | 'unisex';
  images: string[];
  price: number;
  retailPrice: number;
  rentalPeriods: {
    id: string;
    name: string;
    days: number;
    price: number;
  }[];
  sizes: {
    id: string;
    name: string;
    available: boolean;
  }[];
  colors: {
    id: string;
    name: string;
    value: string;
    available: boolean;
  }[];
  isNew: boolean;
  featured: boolean;
  shopId: string;
  shopName: string;
}

// Sample product data
export const products: Product[] = [
  {
    id: "1",
    name: "Elegant Evening Gown",
    brand: "Vera Wang",
    description: "A stunning floor-length evening gown perfect for formal occasions. Made with premium silk and featuring delicate embroidery details.",
    category: "dresses",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    ],
    price: 89,
    retailPrice: 1200,
    rentalPeriods: [
      { id: "4-day", name: "4 Days", days: 4, price: 89 },
      { id: "8-day", name: "8 Days", days: 8, price: 149 },
    ],
    sizes: [
      { id: "xs", name: "XS", available: true },
      { id: "s", name: "S", available: true },
      { id: "m", name: "M", available: true },
      { id: "l", name: "L", available: true },
      { id: "xl", name: "XL", available: false },
    ],
    colors: [
      { id: "black", name: "Black", value: "#000000", available: true },
      { id: "red", name: "Red", value: "#FF0000", available: true },
    ],
    isNew: true,
    featured: true,
    shopId: "shop-1",
    shopName: "Elegance Boutique",
  },
  {
    id: "2",
    name: "Classic Tailored Suit",
    brand: "Hugo Boss",
    description: "A sophisticated, modern fit suit perfect for business meetings or special events. Made from finest wool blend for comfort and durability.",
    category: "suits",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    ],
    price: 95,
    retailPrice: 850,
    rentalPeriods: [
      { id: "4-day", name: "4 Days", days: 4, price: 95 },
      { id: "8-day", name: "8 Days", days: 8, price: 159 },
    ],
    sizes: [
      { id: "38r", name: "38R", available: true },
      { id: "40r", name: "40R", available: true },
      { id: "42r", name: "42R", available: true },
      { id: "44r", name: "44R", available: false },
    ],
    colors: [
      { id: "navy", name: "Navy", value: "#000080", available: true },
      { id: "charcoal", name: "Charcoal", value: "#36454F", available: true },
    ],
    isNew: false,
    featured: true,
    shopId: "shop-2",
    shopName: "Men's Formal Studio",
  },
  {
    id: "3",
    name: "Designer Clutch Bag",
    brand: "Prada",
    description: "An elegant evening clutch with gold-chain detail and magnetic clasp. The perfect accessory for formal events.",
    category: "accessories",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    ],
    price: 45,
    retailPrice: 550,
    rentalPeriods: [
      { id: "4-day", name: "4 Days", days: 4, price: 45 },
      { id: "8-day", name: "8 Days", days: 8, price: 75 },
    ],
    sizes: [
      { id: "one-size", name: "One Size", available: true },
    ],
    colors: [
      { id: "gold", name: "Gold", value: "#FFD700", available: true },
      { id: "silver", name: "Silver", value: "#C0C0C0", available: true },
      { id: "black", name: "Black", value: "#000000", available: true },
    ],
    isNew: true,
    featured: true,
    shopId: "shop-1",
    shopName: "Elegance Boutique",
  },
  {
    id: "4",
    name: "Summer Maxi Dress",
    brand: "Reformation",
    description: "A light, flowing maxi dress perfect for summer events. Made from sustainable fabrics with a flattering silhouette.",
    category: "dresses",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    ],
    price: 65,
    retailPrice: 320,
    rentalPeriods: [
      { id: "4-day", name: "4 Days", days: 4, price: 65 },
      { id: "8-day", name: "8 Days", days: 8, price: 110 },
    ],
    sizes: [
      { id: "xs", name: "XS", available: true },
      { id: "s", name: "S", available: true },
      { id: "m", name: "M", available: true },
      { id: "l", name: "L", available: true },
      { id: "xl", name: "XL", available: true },
    ],
    colors: [
      { id: "floral", name: "Floral", value: "#FFC0CB", available: true },
      { id: "blue", name: "Blue", value: "#ADD8E6", available: true },
    ],
    isNew: false,
    featured: false,
    shopId: "shop-3",
    shopName: "Summer Style Co",
  },
  {
    id: "5",
    name: "Cashmere Overcoat",
    brand: "Burberry",
    description: "A luxurious winter overcoat made from 100% cashmere. Perfect for staying warm with unparalleled style.",
    category: "outerwear",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    ],
    price: 120,
    retailPrice: 1800,
    rentalPeriods: [
      { id: "4-day", name: "4 Days", days: 4, price: 120 },
      { id: "8-day", name: "8 Days", days: 8, price: 200 },
    ],
    sizes: [
      { id: "s", name: "S", available: true },
      { id: "m", name: "M", available: true },
      { id: "l", name: "L", available: true },
      { id: "xl", name: "XL", available: false },
    ],
    colors: [
      { id: "camel", name: "Camel", value: "#C19A6B", available: true },
      { id: "black", name: "Black", value: "#000000", available: true },
    ],
    isNew: true,
    featured: true,
    shopId: "shop-2",
    shopName: "Men's Formal Studio",
  },
  {
    id: "6",
    name: "Cocktail Dress",
    brand: "Diane von Furstenberg",
    description: "A chic, knee-length cocktail dress with a flattering wrap design, perfect for semi-formal occasions.",
    category: "dresses",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    ],
    price: 75,
    retailPrice: 450,
    rentalPeriods: [
      { id: "4-day", name: "4 Days", days: 4, price: 75 },
      { id: "8-day", name: "8 Days", days: 8, price: 125 },
    ],
    sizes: [
      { id: "0", name: "0", available: false },
      { id: "2", name: "2", available: true },
      { id: "4", name: "4", available: true },
      { id: "6", name: "6", available: true },
      { id: "8", name: "8", available: true },
      { id: "10", name: "10", available: false },
      { id: "12", name: "12", available: false },
    ],
    colors: [
      { id: "red", name: "Red", value: "#FF0000", available: true },
      { id: "black", name: "Black", value: "#000000", available: true },
      { id: "green", name: "Green", value: "#008000", available: true },
    ],
    isNew: false,
    featured: true,
    shopId: "shop-1",
    shopName: "Elegance Boutique",
  },
  {
    id: "7",
    name: "Tuxedo Set",
    brand: "Tom Ford",
    description: "A classic black tuxedo set for the most formal occasions. Includes jacket, pants, and bow tie.",
    category: "suits",
    gender: "men",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    ],
    price: 150,
    retailPrice: 2400,
    rentalPeriods: [
      { id: "4-day", name: "4 Days", days: 4, price: 150 },
      { id: "8-day", name: "8 Days", days: 8, price: 250 },
    ],
    sizes: [
      { id: "38r", name: "38R", available: true },
      { id: "40r", name: "40R", available: true },
      { id: "42r", name: "42R", available: true },
      { id: "44r", name: "44R", available: true },
      { id: "46r", name: "46R", available: false },
    ],
    colors: [
      { id: "black", name: "Black", value: "#000000", available: true },
    ],
    isNew: false,
    featured: true,
    shopId: "shop-2",
    shopName: "Men's Formal Studio",
  },
  {
    id: "8",
    name: "Statement Necklace",
    brand: "Swarovski",
    description: "A dazzling crystal necklace that will elevate any outfit to red-carpet status.",
    category: "accessories",
    gender: "women",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    ],
    price: 60,
    retailPrice: 350,
    rentalPeriods: [
      { id: "4-day", name: "4 Days", days: 4, price: 60 },
      { id: "8-day", name: "8 Days", days: 8, price: 100 },
    ],
    sizes: [
      { id: "one-size", name: "One Size", available: true },
    ],
    colors: [
      { id: "silver", name: "Silver", value: "#C0C0C0", available: true },
      { id: "gold", name: "Gold", value: "#FFD700", available: true },
    ],
    isNew: true,
    featured: false,
    shopId: "shop-3",
    shopName: "Summer Style Co",
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsByGender = (gender: 'women' | 'men' | 'unisex'): Product[] => {
  return products.filter(product => product.gender === gender);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
