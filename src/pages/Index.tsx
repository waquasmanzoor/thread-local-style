
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductGrid from "@/components/product/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, TrendingUp } from "lucide-react";
import { Product } from "@/types";
import { getAllProducts } from "@/services/productService";
import Hero from "@/components/home/Hero";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTrending, setShowTrending] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (data) {
      setProducts(data as Product[]);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowTrending(false);
  };

  const handleTrendingClick = () => {
    setShowTrending(true);
    setSearchTerm("");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingProducts = showTrending
    ? products.slice(0, 4) // For demo, showing first 4 products as trending
    : filteredProducts;

  return (
    <div className="space-y-10">
      <Hero />
      <div className="container py-10 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors duration-200">
            {showTrending ? "Trending Products" : "All Products"}
          </h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTrendingClick}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
            <Link to="/category/all">
              <Button size="sm">See All</Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-40 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={trendingProducts} />
        )}
      </div>
    </div>
  );
};

export default Index;
