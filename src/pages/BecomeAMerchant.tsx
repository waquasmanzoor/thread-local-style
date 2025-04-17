
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Store, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createMerchantProfile } from "@/services/merchantService";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

const merchantFormSchema = z.object({
  store_name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(300, {
    message: "Description must not be longer than 300 characters."
  }),
  logo_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type MerchantFormValues = z.infer<typeof merchantFormSchema>;

export default function BecomeAMerchant() {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<MerchantFormValues>({
    resolver: zodResolver(merchantFormSchema),
    defaultValues: {
      store_name: "",
      description: "",
      logo_url: "",
    },
  });

  const merchantMutation = useMutation({
    mutationFn: createMerchantProfile,
    onSuccess: () => {
      toast({
        title: "Merchant account created!",
        description: "You can now list your products for rent.",
      });
      navigate("/merchant");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to create merchant account",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  // Placeholder for image upload - in a real app you'd implement file upload to a storage service
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate file upload with a delay
      setTimeout(() => {
        const fakeUrl = `https://source.unsplash.com/random/300x300?store&${Date.now()}`;
        setImagePreview(fakeUrl);
        form.setValue("logo_url", fakeUrl);
        setIsUploading(false);
      }, 1500);
    }
  };

  function onSubmit(values: MerchantFormValues) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to continue",
      });
      navigate("/login?redirect=/become-merchant");
      return;
    }
    
    merchantMutation.mutate({
      store_name: values.store_name,
      description: values.description,
      logo_url: values.logo_url || null,
    });
  }

  if (!user) {
    navigate("/login?redirect=/become-merchant");
    return null;
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="space-y-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Become a Merchant</h1>
          <p className="text-muted-foreground">
            Set up your merchant profile to start listing products for rent
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              <CardTitle>Merchant Information</CardTitle>
            </div>
            <CardDescription>
              Fill in your store details to get started with your merchant account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="store_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Store Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is how your store will appear to customers.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell customers about your store and products"
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Briefly describe your store and what you offer.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel htmlFor="logo">Store Logo</FormLabel>
                    <div className="mt-2 flex items-start space-x-4">
                      <div className="w-24 h-24 rounded-md overflow-hidden border flex items-center justify-center bg-muted">
                        {isUploading ? (
                          <Skeleton className="w-full h-full" />
                        ) : imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Store className="h-10 w-10 text-muted-foreground" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="relative"
                          disabled={isUploading}
                        >
                          <input
                            id="logo"
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                          <Upload className="h-4 w-4 mr-2" />
                          {isUploading ? "Uploading..." : "Upload Logo"}
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          Recommended: 300x300px JPG, PNG or GIF
                        </p>
                        <FormField
                          control={form.control}
                          name="logo_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="hidden"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <CardFooter className="px-0 pt-6">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={merchantMutation.isPending || isUploading}
                  >
                    {merchantMutation.isPending ? "Creating your merchant account..." : "Create Merchant Account"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Reach More Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>List your items for rent and reach customers looking for short-term rentals. Earn extra income from your items when you're not using them.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Full Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage your inventory, set your own prices, and decide which items to make available. You're in complete control of your rental business.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
