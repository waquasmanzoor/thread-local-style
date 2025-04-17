
import { ArrowRight, Store, TrendingUp, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BecomeMerchant = () => {
  return (
    <div className="bg-primary/5 py-16">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              For renters
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              List your products for rent
            </h2>
            <p className="text-lg text-muted-foreground">
              Have items you're not using all the time? List them on our platform and earn money by renting them out to others.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <h3 className="text-base font-medium">Create a merchant account</h3>
                  <p className="text-sm text-muted-foreground">
                    Set up your profile in minutes and start listing your products.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <h3 className="text-base font-medium">Manage your listings</h3>
                  <p className="text-sm text-muted-foreground">
                    Full control over your inventory, prices, and availability.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <h3 className="text-base font-medium">Earn passive income</h3>
                  <p className="text-sm text-muted-foreground">
                    Turn your unused items into a source of regular income.
                  </p>
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="mt-2">
              <Link to="/become-merchant">
                Become a merchant <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1664575198308-3959904fa430?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Merchant dashboard"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeMerchant;
