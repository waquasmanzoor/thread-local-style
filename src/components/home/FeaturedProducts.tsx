
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/data/products";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();
  const [activeTab, setActiveTab] = useState<"women" | "men">("women");

  const filteredProducts = featuredProducts.filter(
    (product) => product.gender === activeTab
  );

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            Featured Styles
          </h2>
          <p className="text-muted-foreground mt-2 text-center max-w-lg">
            Curated collections from top designers, available to rent at a fraction of the retail price
          </p>
          <div className="flex gap-2 mt-6">
            <Button
              variant={activeTab === "women" ? "default" : "outline"}
              onClick={() => setActiveTab("women")}
              className="px-8"
            >
              Women
            </Button>
            <Button
              variant={activeTab === "men" ? "default" : "outline"}
              onClick={() => setActiveTab("men")}
              className="px-8"
            >
              Men
            </Button>
          </div>
        </div>

        <ProductGrid
          products={filteredProducts.map((product) => ({
            id: product.id,
            name: product.name,
            brand: product.brand,
            image: product.images[0],
            price: product.price,
            retailPrice: product.retailPrice,
            isNew: product.isNew,
            rentalPeriod: product.rentalPeriods[0].name,
          }))}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
