
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FilterX, Filter, ArrowDownUp, ShoppingCart } from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import MerchantLayout from "@/components/merchant/MerchantLayout";
import { 
  getMerchantProfile, 
  getMerchantRentals,
  MerchantRental
} from "@/services/merchantService";

type RentalStatus = "pending" | "approved" | "active" | "completed" | "cancelled";

const MerchantOrders = () => {
  const [sortField, setSortField] = useState<"created_at" | "status">("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({
    status: "",
    dateFrom: "",
    dateTo: ""
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: merchantData } = useQuery({
    queryKey: ['merchantProfile'],
    queryFn: getMerchantProfile,
  });

  const merchant = merchantData?.data;

  const { data: rentalsData, isLoading } = useQuery({
    queryKey: ['merchantRentals', merchant?.id],
    queryFn: () => merchant ? getMerchantRentals(merchant.id) : Promise.resolve({ data: [] }),
    enabled: !!merchant,
  });

  const rentals = (rentalsData?.data || []) as MerchantRental[];

  const toggleSort = (field: "created_at" | "status") => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredRentals = rentals.filter(rental => {
    // Filter by status
    if (filters.status && rental.status !== filters.status) {
      return false;
    }
    
    // Filter by date range
    const rentalDate = new Date(rental.created_at);
    
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      if (rentalDate < fromDate) {
        return false;
      }
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59); // End of day
      if (rentalDate > toDate) {
        return false;
      }
    }
    
    return true;
  });

  const sortedRentals = [...filteredRentals].sort((a, b) => {
    if (sortField === 'status') {
      const statusOrder = ["pending", "approved", "active", "completed", "cancelled"];
      const aIndex = statusOrder.indexOf(a.status as RentalStatus);
      const bIndex = statusOrder.indexOf(b.status as RentalStatus);
      
      if (sortOrder === 'asc') {
        return aIndex - bIndex;
      } else {
        return bIndex - aIndex;
      }
    } else {
      // Sort by date
      const aValue = new Date(a.created_at).getTime();
      const bValue = new Date(b.created_at).getTime();
      
      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  });

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      dateFrom: "",
      dateTo: ""
    });
  };

  const hasActiveFilters = filters.status || filters.dateFrom || filters.dateTo;

  const statusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "approved":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "active":
        return "bg-green-50 text-green-600 border-green-200";
      case "completed":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <MerchantLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Orders</h1>
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters}>
                <FilterX className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Orders</SheetTitle>
                  <SheetDescription>
                    Apply filters to find specific orders.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 py-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) => setFilters({...filters, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                        placeholder="From"
                      />
                      <span>to</span>
                      <Input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                        placeholder="To"
                      />
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button onClick={() => applyFilters(filters)}>Apply Filters</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : sortedRentals.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort('created_at')}>
                      Date 
                      {sortField === 'created_at' && (
                        <ArrowDownUp size={16} className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort('status')}>
                      Status 
                      {sortField === 'status' && (
                        <ArrowDownUp size={16} className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRentals.map((rental) => (
                  <TableRow key={rental.id}>
                    <TableCell className="font-medium">#{rental.id.substring(0, 8)}</TableCell>
                    <TableCell>
                      {rental.merchant_products?.name || "Unknown Product"}
                    </TableCell>
                    <TableCell>{new Date(rental.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusVariant(rental.status)}>
                        {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${rental.merchant_products?.price?.toFixed(2) || "0.00"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border rounded-lg p-12">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No orders found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {hasActiveFilters 
                ? "No orders match your current filters. Try changing your filters or clearing them."
                : "You don't have any orders yet. Once customers rent your products, they'll appear here."}
            </p>
          </div>
        )}
      </div>
    </MerchantLayout>
  );
};

export default MerchantOrders;
