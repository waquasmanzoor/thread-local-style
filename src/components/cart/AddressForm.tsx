import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress } from "@/services/addressService";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  street_address: z.string().min(2, {
    message: "Street address must be at least 2 characters.",
  }),
  apartment: z.string().optional(),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  postal_code: z.string().min(5, {
    message: "Postal code must be at least 5 characters.",
  }),
  country: z.string().optional(),
});

interface AddressFormProps {
  onAddressCreated?: () => void;
}

export function AddressForm({ onAddressCreated }: AddressFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street_address: "",
      apartment: "",
      city: "",
      state: "",
      postal_code: "",
      country: "United States",
    },
  });

  const { mutate: createNewAddress } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      setIsCreating(true);
      return createAddress(values);
    },
    onSuccess: () => {
      setIsCreating(false);
      toast({
        title: "Address created successfully!",
        description: "Your new address has been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      form.reset();
      onAddressCreated?.();
    },
    onError: (error: any) => {
      setIsCreating(false);
      toast({
        variant: "destructive",
        title: "Failed to create address",
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createNewAddress(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="street_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Apartment 4B" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="United States" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    {/* Add more countries here if needed */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Add Address"}
        </Button>
      </form>
    </Form>
  );
}
