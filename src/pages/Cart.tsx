
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, ChevronDown, ChevronUp, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Container from "@/components/layout/Container";
import AddressSelector from "@/components/cart/AddressSelector";
import { createRazorpayOrder, updatePaymentStatus } from "@/services/paymentService";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Dummy cart items
const dummyCartItems = [
  {
    id: "1",
    name: "Designer Evening Gown",
    brand: "Vera Wang",
    price: 120,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
    size: "M",
    color: "Black",
    rentalPeriod: "4 Days"
  },
  {
    id: "2",
    name: "Classic Suit",
    brand: "Hugo Boss",
    price: 200,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    size: "42R",
    color: "Navy",
    rentalPeriod: "8 Days"
  }
];

const Cart = () => {
  const { user } = useAuth();
  const [isAddressOpen, setIsAddressOpen] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [cartItems] = useState(dummyCartItems);
  const [isLoading, setIsLoading] = useState(false);
  const isEmpty = cartItems.length === 0;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shippingFee = 15;
  const total = subtotal + shippingFee;

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handlePayment = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please log in to proceed with payment"
      });
      return;
    }

    if (!selectedAddressId) {
      toast({
        variant: "destructive",
        title: "Address Required",
        description: "Please select a delivery address"
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Create dummy rental details
      const rentalInfo = {
        items: cartItems,
        addressId: selectedAddressId,
      };
      
      const orderDetails = await createRazorpayOrder(total * 100, rentalInfo);

      const options = {
        key: orderDetails.razorpay_key,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: "RESTYLE",
        description: "Clothing Rental Payment",
        order_id: orderDetails.id,
        handler: async (response: any) => {
          try {
            await updatePaymentStatus(
              orderDetails.id, 
              'completed', 
              response.razorpay_payment_id
            );

            toast({
              title: "Payment Successful",
              description: "Your rental has been confirmed"
            });
          } catch (updateError) {
            toast({
              variant: "destructive",
              title: "Payment Update Error",
              description: "Unable to update payment status"
            });
          }
        },
        prefill: {
          email: user.email || "",
        },
        theme: {
          color: "#3399cc"
        }
      };

      // @ts-ignore - Razorpay type issue
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Unable to process payment"
      });
    } finally {
      setIsLoading(false);
    }
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
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 bg-card p-4 rounded-lg border"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                        </div>
                        <p className="font-medium">${item.price}</p>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                        <p>Rental Period: {item.rentalPeriod}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    onClick={handlePayment} 
                    disabled={!selectedAddressId || isLoading} 
                    className="w-full mt-6"
                  >
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
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
