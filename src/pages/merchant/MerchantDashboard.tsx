
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp } from "lucide-react";
import MerchantLayout from "@/components/merchant/MerchantLayout";
import { getMerchantProfile, getMerchantProducts, getMerchantRentals } from "@/services/merchantService";

const MerchantDashboard = () => {
  const { data: merchantData } = useQuery({
    queryKey: ['merchantProfile'],
    queryFn: getMerchantProfile,
  });

  const merchant = merchantData?.data;

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['merchantProducts', merchant?.id],
    queryFn: () => merchant ? getMerchantProducts(merchant.id) : Promise.resolve({ data: [] }),
    enabled: !!merchant,
  });

  const { data: rentalsData, isLoading: rentalsLoading } = useQuery({
    queryKey: ['merchantRentals', merchant?.id],
    queryFn: () => merchant ? getMerchantRentals(merchant.id) : Promise.resolve({ data: [] }),
    enabled: !!merchant,
  });

  const products = productsData?.data || [];
  const rentals = rentalsData?.data || [];

  return (
    <MerchantLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard 
            title="Total Products" 
            value={productsLoading ? "Loading..." : `${products.length}`} 
            description="Total number of products"
            icon={<Package className="h-6 w-6" />}
          />
          <DashboardCard 
            title="Total Orders" 
            value={rentalsLoading ? "Loading..." : `${rentals.length}`} 
            description="Total number of orders"
            icon={<ShoppingCart className="h-6 w-6" />}
          />
          <DashboardCard 
            title="Active Listings" 
            value={productsLoading ? "Loading..." : `${products.filter(p => p.is_active).length}`} 
            description="Products available for rent"
            icon={<TrendingUp className="h-6 w-6" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>Your recently added products</CardDescription>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <p>Loading products...</p>
              ) : products.length > 0 ? (
                <div className="space-y-2">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex justify-between items-center p-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No products yet. Add your first product to get started.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your recently received orders</CardDescription>
            </CardHeader>
            <CardContent>
              {rentalsLoading ? (
                <p>Loading orders...</p>
              ) : rentals.length > 0 ? (
                <div className="space-y-2">
                  {rentals.slice(0, 5).map((rental: any) => (
                    <div key={rental.id} className="flex justify-between items-center p-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">Order #{rental.id.substring(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">{new Date(rental.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          rental.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          rental.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {rental.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No orders yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MerchantLayout>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardCard = ({ title, value, description, icon }: DashboardCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MerchantDashboard;
