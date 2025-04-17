
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import MerchantProducts from "./pages/merchant/MerchantProducts";
import MerchantOrders from "./pages/merchant/MerchantOrders";
import MerchantSettings from "./pages/merchant/MerchantSettings";
import BecomeAMerchant from "./pages/BecomeAMerchant";

// This component exports routes that can be imported in main.tsx
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/merchant" element={<MerchantDashboard />} />
      <Route path="/merchant/products" element={<MerchantProducts />} />
      <Route path="/merchant/orders" element={<MerchantOrders />} />
      <Route path="/merchant/settings" element={<MerchantSettings />} />
      <Route path="/become-merchant" element={<BecomeAMerchant />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
