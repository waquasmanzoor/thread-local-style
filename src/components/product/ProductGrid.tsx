
import { ReactNode } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  retailPrice?: number;
  isNew?: boolean;
  rentalPeriod: string;
}

interface ProductGridProps {
  products: Product[];
  header?: ReactNode;
}

const ProductGrid = ({ products, header }: ProductGridProps) => {
  return (
    <div className="space-y-6">
      {header && <div className="mb-6">{header}</div>}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
