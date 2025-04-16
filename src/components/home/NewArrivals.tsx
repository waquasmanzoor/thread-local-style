
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product/ProductGrid";
import { getNewArrivals } from "@/data/products";

const NewArrivals = () => {
  const newArrivalsProducts = getNewArrivals().slice(0, 4);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">New Arrivals</h2>
            <p className="text-muted-foreground mt-1">
              Fresh styles added to our collection
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/new">View All</Link>
          </Button>
        </div>

        <ProductGrid
          products={newArrivalsProducts.map((product) => ({
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

export default NewArrivals;
