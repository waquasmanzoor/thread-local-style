
import { Link } from "react-router-dom";
import { Store, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BecomeMerchantPromoProps {
  variant?: "card" | "banner";
  className?: string;
}

export const BecomeMerchantPromo = ({ variant = "card", className }: BecomeMerchantPromoProps) => {
  if (variant === "banner") {
    return (
      <div className={`bg-gradient-to-r from-primary/20 to-primary/5 p-4 rounded-lg ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-background p-2 rounded-full">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Have items to rent out?</h3>
              <p className="text-sm text-muted-foreground">Become a merchant and earn from your unused items</p>
            </div>
          </div>
          <Button asChild size="sm" variant="outline" className="ml-4">
            <Link to="/become-merchant">
              Learn more <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Rent Out Your Items</CardTitle>
        </div>
        <CardDescription>
          Turn your unused items into income
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        Create a merchant account to list your items for rent on our platform. Set your own prices and conditions.
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to="/become-merchant">
            Become a Merchant <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
