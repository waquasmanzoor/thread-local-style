
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import MerchantProducts from "./pages/merchant/MerchantProducts";
import MerchantOrders from "./pages/merchant/MerchantOrders";
import MerchantSettings from "./pages/merchant/MerchantSettings";

// Import CSS files for styling
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/women" element={<CategoryPage />} />
              <Route path="/men" element={<CategoryPage />} />
              <Route path="/designer" element={<CategoryPage />} />
              <Route path="/new" element={<CategoryPage />} />
              
              {/* Merchant Dashboard Routes */}
              <Route path="/merchant" element={<MerchantDashboard />} />
              <Route path="/merchant/products" element={<MerchantProducts />} />
              <Route path="/merchant/orders" element={<MerchantOrders />} />
              <Route path="/merchant/settings" element={<MerchantSettings />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
