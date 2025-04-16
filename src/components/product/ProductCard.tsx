
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  retailPrice?: number;
  isNew?: boolean;
  rentalPeriod: string;
}

const ProductCard = ({
  id,
  name,
  brand,
  image,
  price,
  retailPrice,
  isNew,
  rentalPeriod,
}: ProductCardProps) => {
  return (
    <div className="group relative">
      <div className="aspect-[3/4] overflow-hidden rounded-md bg-secondary">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
        {isNew && (
          <Badge className="absolute top-2 left-2">New</Badge>
        )}
      </div>

      <div className="mt-3 space-y-1 text-center">
        <h3 className="font-medium text-card-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{brand}</p>
        <div className="flex justify-center items-center space-x-2">
          <span className="font-semibold text-primary">${price}</span>
          {retailPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${retailPrice}
            </span>
          )}
          <span className="text-xs text-muted-foreground">/{rentalPeriod}</span>
        </div>
      </div>

      <Link
        to={`/product/${id}`}
        className="absolute inset-0"
        aria-label={`View ${name} details`}
      />
    </div>
  );
};

export default ProductCard;
