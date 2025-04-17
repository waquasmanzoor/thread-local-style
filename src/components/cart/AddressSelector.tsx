
import React, { useEffect, useState } from 'react';
import { Check, Plus, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import AddressForm from '@/components/cart/AddressForm';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { DeliveryAddress } from '@/types';
import { getAllAddresses, deleteAddress } from '@/services/addressService';

interface AddressSelectorProps {
  selectedAddressId: string | null;
  onSelectAddress: (addressId: string) => void;
}

export default function AddressSelector({ selectedAddressId, onSelectAddress }: AddressSelectorProps) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    } else {
      setAddresses([]);
      setLoading(false);
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const addressesData = await getAllAddresses();
      setAddresses(addressesData);
      
      // If we have addresses but none selected, select the default or first one
      if (addressesData.length > 0 && !selectedAddressId) {
        const defaultAddress = addressesData.find(addr => addr.is_default);
        onSelectAddress(defaultAddress?.id || addressesData[0].id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to load addresses',
        description: 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuccess = () => {
    setIsAddressFormOpen(false);
    fetchAddresses();
    toast({
      title: 'Address added',
      description: 'Your new address has been saved',
    });
  };

  const handleEditSuccess = () => {
    setEditingAddressId(null);
    fetchAddresses();
    toast({
      title: 'Address updated',
      description: 'Your address has been updated successfully',
    });
  };

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;
    
    try {
      await deleteAddress(addressToDelete);
      setAddressToDelete(null);
      setIsDeleteDialogOpen(false);
      
      // If the deleted address was selected, clear the selection
      if (selectedAddressId === addressToDelete) {
        onSelectAddress('');
      }
      
      fetchAddresses();
      
      toast({
        title: 'Address deleted',
        description: 'Your address has been removed',
      });
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to delete address',
        description: 'Please try again later',
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading addresses...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-4">
        <p className="mb-2">Please log in to manage delivery addresses</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Delivery Address</h3>
        <Sheet open={isAddressFormOpen} onOpenChange={setIsAddressFormOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Add New Address
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Add New Address</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <AddressForm 
                onSuccess={handleAddSuccess} 
                onCancel={() => setIsAddressFormOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground">No saved addresses</p>
          <Button
            variant="link"
            onClick={() => setIsAddressFormOpen(true)}
            className="mt-2"
          >
            Add your first address
          </Button>
        </div>
      ) : (
        <RadioGroup
          value={selectedAddressId || ''}
          onValueChange={onSelectAddress}
          className="grid gap-3"
        >
          {addresses.map((address) => (
            <Label
              key={address.id}
              htmlFor={address.id}
              className="cursor-pointer"
            >
              <Card
                className={`overflow-hidden ${
                  selectedAddressId === address.id
                    ? 'border-primary'
                    : 'border-border'
                }`}
              >
                <CardContent className="p-4 flex justify-between items-start">
                  <div className="flex gap-2">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <div className="space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        {address.street_address}
                        {address.apartment && `, ${address.apartment}`}
                        {address.is_default && (
                          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {address.city}, {address.state}, {address.country} {address.postal_code}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingAddressId(address.id);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle>Edit Address</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <AddressForm
                            onSuccess={handleEditSuccess}
                            onCancel={() => setEditingAddressId(null)}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                    <Dialog
                      open={isDeleteDialogOpen && addressToDelete === address.id}
                      onOpenChange={(open) => {
                        setIsDeleteDialogOpen(open);
                        if (!open) setAddressToDelete(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.preventDefault();
                            setAddressToDelete(address.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Address</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p>Are you sure you want to delete this address?</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {address.street_address}
                            {address.apartment && `, ${address.apartment}`}
                            <br />
                            {address.city}, {address.state}, {address.postal_code}
                          </p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsDeleteDialogOpen(false);
                              setAddressToDelete(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteAddress}
                          >
                            Delete Address
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </Label>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}
