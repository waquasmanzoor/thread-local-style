
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import MerchantLayout from "@/components/merchant/MerchantLayout";
import { 
  getMerchantProfile, 
  createMerchantProfile,
  updateMerchantProfile,
  Merchant 
} from "@/services/merchantService";

const profileFormSchema = z.object({
  store_name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  logo_url: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const MerchantSettings = () => {
  const queryClient = useQueryClient();
  
  const { data: merchantData, isLoading } = useQuery({
    queryKey: ['merchantProfile'],
    queryFn: getMerchantProfile,
  });

  const merchant = merchantData?.data;
  const hasMerchantProfile = !!merchant;

  const defaultValues: ProfileFormValues = {
    store_name: "",
    description: "",
    logo_url: "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (merchant) {
      form.reset({
        store_name: merchant.store_name,
        description: merchant.description || "",
        logo_url: merchant.logo_url || "",
      });
    }
  }, [merchant, form]);

  const createMutation = useMutation({
    mutationFn: createMerchantProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchantProfile'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: ProfileFormValues) => 
      updateMerchantProfile(merchant!.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchantProfile'] });
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    if (hasMerchantProfile) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <MerchantLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your merchant profile and store settings.
          </p>
        </div>

        <Separator />

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                This information will be displayed publicly so be careful what you share.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="store_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your store name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display name. It can be your real name or a pseudonym.
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
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell customers about your store..."
                              className="resize-none"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Write a short description about your store. This will be displayed on your profile.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="logo_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/logo.png" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormDescription>
                            Provide a URL to your store logo. It will be displayed on your profile.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                      >
                        {isLoading ? (
                          <span>Loading...</span>
                        ) : createMutation.isPending || updateMutation.isPending ? (
                          <span>Saving...</span>
                        ) : hasMerchantProfile ? (
                          <span>Save changes</span>
                        ) : (
                          <span>Create profile</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MerchantLayout>
  );
};

export default MerchantSettings;
