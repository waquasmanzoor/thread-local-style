
import { useParams } from "react-router-dom";
import Container from "@/components/layout/Container";
import ProductGrid from "@/components/product/ProductGrid";

// These would come from an API in a real application
const categoryProducts = {
  women: [
    {
      id: "w1",
      name: "Floral Maxi Dress",
      brand: "Free People",
      image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      price: 65,
      rentalPeriod: "4 days"
    },
    {
      id: "w2",
      name: "Evening Gown",
      brand: "Vera Wang",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      price: 120,
      rentalPeriod: "7 days"
    },
    {
      id: "w3",
      name: "Summer Dress",
      brand: "H&M",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
      price: 60,
      rentalPeriod: "4 days"
    },
    {
      id: "w4",
      name: "Casual Jumpsuit",
      brand: "Madewell",
      image: "https://images.unsplash.com/photo-1595291607561-5124c7029470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      price: 70,
      rentalPeriod: "4 days"
    }
  ],
  men: [
    {
      id: "m1",
      name: "Classic Suit",
      brand: "Hugo Boss",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      price: 200,
      rentalPeriod: "7 days"
    },
    {
      id: "m2",
      name: "Casual Blazer",
      brand: "J.Crew",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      price: 90,
      rentalPeriod: "4 days"
    },
    {
      id: "m3",
      name: "Denim Jacket",
      brand: "Levi's",
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      price: 45,
      rentalPeriod: "4 days"
    },
    {
      id: "m4",
      name: "Winter Coat",
      brand: "North Face",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      price: 150,
      rentalPeriod: "7 days"
    }
  ],
  designer: [
    {
      id: "d1",
      name: "Designer Handbag",
      brand: "Gucci",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      price: 250,
      rentalPeriod: "7 days"
    },
    {
      id: "d2",
      name: "Designer Gown",
      brand: "Versace",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      price: 300,
      rentalPeriod: "4 days"
    },
    {
      id: "d3",
      name: "Designer Shoes",
      brand: "Christian Louboutin",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      price: 180,
      rentalPeriod: "7 days"
    },
    {
      id: "d4",
      name: "Luxury Watch",
      brand: "Rolex",
      image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      price: 420,
      rentalPeriod: "3 days"
    }
  ],
  new: [
    {
      id: "n1",
      name: "New Collection Dress",
      brand: "Zimmermann",
      image: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
      price: 130,
      isNew: true,
      rentalPeriod: "4 days"
    },
    {
      id: "n2",
      name: "Limited Edition Blazer",
      brand: "Tom Ford",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      price: 220,
      isNew: true,
      rentalPeriod: "7 days"
    },
    {
      id: "n3",
      name: "Season's Must-Have Bag",
      brand: "Chanel",
      image: "https://images.unsplash.com/photo-1575039331758-4a6798f15d87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      price: 280,
      isNew: true,
      rentalPeriod: "7 days"
    },
    {
      id: "n4",
      name: "New Season Sunglasses",
      brand: "Ray-Ban",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      price: 60,
      isNew: true,
      rentalPeriod: "7 days"
    }
  ]
};

// Mapping for category IDs to display names
const categoryNames = {
  women: "Women's Collection",
  men: "Men's Collection",
  designer: "Designer Pieces",
  new: "New Arrivals"
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  // Default to 'women' if no category is specified or if category is invalid
  const validCategory = (category && categoryProducts[category as keyof typeof categoryProducts]) 
    ? category as keyof typeof categoryProducts 
    : 'women';
  
  const products = categoryProducts[validCategory];
  const categoryTitle = categoryNames[validCategory as keyof typeof categoryNames];

  return (
    <Container>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{categoryTitle}</h1>
          <p className="text-muted-foreground mt-2">
            Discover our curated collection of {validCategory === 'new' 
              ? 'latest arrivals' 
              : `${validCategory === 'designer' ? 'premium' : validCategory === 'men' ? "men's" : "women's"} fashion pieces`} available for rent.
          </p>
        </div>
        
        <ProductGrid 
          products={products}
        />
      </div>
    </Container>
  );
};

export default CategoryPage;
