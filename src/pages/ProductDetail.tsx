
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Truck, RotateCcw, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductById } from "@/data/products";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { createRental } from "@/services/rentalService";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes.find(size => size.available)?.id
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    product?.rentalPeriods[0].id || ""
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors.find(color => color.available)?.id
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRenting, setIsRenting] = useState(false);

  if (!product) {
    return (
      <Container>
        <div className="container mx-auto px-4 py-12">
          <h1>Product not found</h1>
          <Button asChild>
            <Link to="/">Return to homepage</Link>
          </Button>
        </div>
      </Container>
    );
  }

  const currentRentalPeriod = product.rentalPeriods.find(
    period => period.id === selectedPeriod
  );

  const handleRentClick = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!selectedSize) {
      toast({
        variant: "destructive",
        title: "Size required",
        description: "Please select a size before renting.",
      });
      return;
    }

    try {
      setIsRenting(true);
      const result = await createRental({
        productId: product.id,
        rentalPeriodId: selectedPeriod,
        sizeId: selectedSize,
        colorId: selectedColor
      });

      if (result.success) {
        toast({
          title: "Rental created successfully!",
          description: `You've rented ${product.name} for ${currentRentalPeriod?.name}.`,
        });
        // Optionally navigate to a confirmation page or user rentals page
      }
    } catch (error) {
      console.error("Failed to rent:", error);
    } finally {
      setIsRenting(false);
    }
  };

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-secondary rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-lg text-muted-foreground">{product.brand}</p>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </div>
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-xl font-semibold text-primary">
                  ${currentRentalPeriod?.price}
                </p>
                <p className="text-muted-foreground line-through">
                  ${product.retailPrice}
                </p>
                <Badge className="ml-1">
                  {Math.round((1 - (currentRentalPeriod?.price || 0) / product.retailPrice) * 100)}% off retail
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Rental period: {currentRentalPeriod?.name}
              </p>
            </div>

            <Separator />

            {/* Rental Period Selection */}
            <div>
              <h2 className="font-medium mb-3">Select Rental Period</h2>
              <RadioGroup
                value={selectedPeriod}
                onValueChange={setSelectedPeriod}
                className="flex gap-3"
              >
                {product.rentalPeriods.map((period) => (
                  <div key={period.id} className="flex-1">
                    <RadioGroupItem
                      value={period.id}
                      id={period.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={period.id}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Calendar className="mb-3 h-6 w-6" />
                      <p className="font-medium">{period.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${period.price}
                      </p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium">Select Size</h2>
                <Button variant="link" className="p-0 h-auto">
                  Size Guide
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size.id}
                    variant={selectedSize === size.id ? "default" : "outline"}
                    className="min-w-[3rem]"
                    onClick={() => setSelectedSize(size.id)}
                    disabled={!size.available}
                  >
                    {size.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection (if available) */}
            {product.colors.length > 1 && (
              <div>
                <h2 className="font-medium mb-3">Select Color</h2>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color.id
                          ? "ring-2 ring-primary ring-offset-2"
                          : "ring-1 ring-border"
                      } ${!color.available && "opacity-50 cursor-not-allowed"}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => color.available && setSelectedColor(color.id)}
                      disabled={!color.available}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Shop Info */}
            <div>
              <p className="text-sm">
                Rented from <span className="font-medium">{product.shopName}</span>
              </p>
            </div>

            {/* Rent Button */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="w-full py-6" 
                size="lg" 
                variant="secondary"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Bag
              </Button>
              
              <Button 
                className="w-full py-6" 
                size="lg"
                onClick={handleRentClick}
                disabled={isRenting}
              >
                <Calendar className="mr-2 h-5 w-5" /> 
                {isRenting ? "Processing..." : "Rent Now"}
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="h-5 w-5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">Free with prepaid label</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Product Details Tabs */}
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="sizing">Size & Fit</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4">
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </TabsContent>
              <TabsContent value="details" className="p-4">
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Brand: {product.brand}</li>
                  <li>Retail Price: ${product.retailPrice}</li>
                  <li>Category: {product.category}</li>
                  <li>For: {product.gender === "women" ? "Women" : product.gender === "men" ? "Men" : "Unisex"}</li>
                </ul>
              </TabsContent>
              <TabsContent value="sizing" className="p-4">
                <p className="text-sm text-muted-foreground">
                  This item runs true to size. We recommend ordering your regular size.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        open={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </Container>
  );
};

export default ProductDetail;
