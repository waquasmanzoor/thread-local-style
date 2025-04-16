
import Container from "@/components/layout/Container";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cart = () => {
  // For now, we'll show an empty cart
  const isEmpty = true;

  return (
    <Container>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added any items to your cart yet.
              Explore our catalog to find the perfect pieces to rent.
            </p>
            <Button asChild size="lg">
              <Link to="/">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div>
            {/* Cart items will go here when implemented */}
            <p>Cart items will be displayed here</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
