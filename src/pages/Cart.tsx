
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Container from "@/components/layout/Container";
import AddressSelector from "@/components/cart/AddressSelector";
import { DeliveryAddress } from "@/types";

const Cart = () => {
  // For now, we'll show an empty cart
  const isEmpty = true;
  const [isAddressOpen, setIsAddressOpen] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  return (
    <Container>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl font-serif font-bold mb-6 text-gradient">Your Cart</h1>
        
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-primary/10 p-8 rounded-full mb-8 animate-fade-in">
              <ShoppingBag className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-serif font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-10 max-w-md">
              Looks like you haven't added any items to your cart yet.
              Explore our catalog to find the perfect pieces to rent.
            </p>
            <Button asChild size="lg" className="group">
              <Link to="/">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Cart items will go here when implemented */}
              <p>Cart items will be displayed here</p>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm border p-6 space-y-6">
                <Collapsible open={isAddressOpen} onOpenChange={setIsAddressOpen}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between font-medium">
                    Delivery Information
                    {isAddressOpen ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <AddressSelector 
                      selectedAddressId={selectedAddressId} 
                      onSelectAddress={handleAddressSelection} 
                    />
                  </CollapsibleContent>
                </Collapsible>
                
                <div className="pt-6 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>$0.00</span>
                  </div>
                  
                  <Button disabled={!selectedAddressId} className="w-full mt-6">
                    Proceed to Checkout
                  </Button>
                  
                  {!selectedAddressId && (
                    <p className="text-xs text-center mt-2 text-muted-foreground">
                      Please select a delivery address to continue
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
