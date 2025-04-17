
import { useQuery } from "@tanstack/react-query";
import { getMerchantProfile } from "@/services/merchantService";
import { useAuth } from "./useAuth";

export const useMerchantStatus = () => {
  const { user } = useAuth();
  
  const { data, isLoading } = useQuery({
    queryKey: ['merchantProfile'],
    queryFn: getMerchantProfile,
    enabled: !!user,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return {
    isMerchant: !!data?.data,
    merchantData: data?.data,
    isLoading,
  };
};
