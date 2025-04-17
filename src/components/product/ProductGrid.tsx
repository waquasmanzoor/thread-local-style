
import { ReactNode } from "react";
import ProductCard from "./ProductCard";
import { BecomeMerchantPromo } from "@/components/merchant/BecomeMerchantPromo";
import { useMerchantStatus } from "@/hooks/useMerchantStatus";
import { useAuth } from "@/hooks/useAuth";

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
  showMerchantPromo?: boolean;
}

const ProductGrid = ({ products, header, showMerchantPromo = true }: ProductGridProps) => {
  const { user } = useAuth();
  const { isMerchant } = useMerchantStatus();
  
  // Only show promo to logged in users who aren't merchants
  const shouldShowPromo = showMerchantPromo && user && !isMerchant;
  
  // Insert merchant promo card at position 3 if applicable
  const productItems = [...products];
  
  return (
    <div className="space-y-6">
      {header && <div className="mb-6">{header}</div>}
      
      {shouldShowPromo && (
        <BecomeMerchantPromo variant="banner" className="mb-6" />
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {productItems.map((product, index) => (
          <ProductCard key={product.id} {...product} />
        ))}
        
        {/* Add merchant promo card within the grid for logged in non-merchants */}
        {shouldShowPromo && products.length > 3 && (
          <div className="hidden md:block" style={{ gridRow: 'span 1' }}>
            <BecomeMerchantPromo />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
