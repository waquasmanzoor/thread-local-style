
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Trash2, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserAddresses, deleteAddress, DeliveryAddress } from "@/services/addressService";
import { AddressForm } from "./AddressForm";
import { useToast } from "@/components/ui/use-toast";

interface AddressSelectorProps {
  onSelectAddress?: (address: DeliveryAddress) => void;
}

export function AddressSelector({ onSelectAddress }: AddressSelectorProps) {
  const { toast } = useToast();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const { 
    data: addressesData, 
    isLoading, 
    isError,
    refetch 
  } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: getUserAddresses,
  });

  const addresses = addressesData?.data || [];

  // Set default selected address when addresses are loaded
  useState(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find(addr => addr.is_default) || addresses[0];
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        if (onSelectAddress) onSelectAddress(defaultAddress);
      }
    }
  });

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find(addr => addr.id === addressId);
    if (selectedAddress && onSelectAddress) {
      onSelectAddress(selectedAddress);
    }
  };

  const handleAddressFormSuccess = () => {
    setIsAddressFormOpen(false);
    refetch();
  };

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;
    
    try {
      await deleteAddress(addressToDelete);
      toast({
        title: "Address deleted",
        description: "The delivery address has been deleted successfully.",
      });
      refetch();
      setAddressToDelete(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete address. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isError) {
    return (
      <div className="py-4 text-center">
        <p className="text-destructive">Failed to load addresses.</p>
        <Button onClick={() => refetch()} variant="outline" className="mt-2">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Delivery Address</h3>
        <Dialog open={isAddressFormOpen} onOpenChange={setIsAddressFormOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Add New</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Delivery Address</DialogTitle>
              <DialogDescription>
                Fill in the details for your new delivery address.
              </DialogDescription>
            </DialogHeader>
            <AddressForm 
              onSuccess={handleAddressFormSuccess} 
              onCancel={() => setIsAddressFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-lg">
          <MapPin className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No saved addresses found.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setIsAddressFormOpen(true)}
          >
            Add Delivery Address
          </Button>
        </div>
      ) : (
        <RadioGroup 
          value={selectedAddressId || undefined} 
          onValueChange={handleAddressSelection}
          className="space-y-3"
        >
          {addresses.map((address) => (
            <Card key={address.id} className={`border ${selectedAddressId === address.id ? 'border-primary' : ''}`}>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex gap-3">
                  <RadioGroupItem value={address.id} id={`address-${address.id}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{address.street_address}</span>
                      {address.is_default && (
                        <span className="flex text-xs items-center gap-1 text-primary">
                          <Home className="h-3 w-3" /> Default
                        </span>
                      )}
                    </div>
                    {address.apartment && (
                      <p className="text-sm text-muted-foreground">
                        {address.apartment}
                      </p>
                    )}
                    <p className="text-sm">
                      {address.city}, {address.state} {address.postal_code}
                    </p>
                    <p className="text-sm">{address.country}</p>
                  </div>
                </div>
                <AlertDialog open={addressToDelete === address.id} onOpenChange={(open) => !open && setAddressToDelete(null)}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddressToDelete(address.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Address</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this delivery address? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAddress}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}
