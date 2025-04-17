
import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Package2, ShoppingCart, Settings, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getMerchantProfile, Merchant } from "@/services/merchantService";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  SidebarProvider,
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from "@/components/ui/sidebar";

interface MerchantLayoutProps {
  children: ReactNode;
}

const MerchantLayout = ({ children }: MerchantLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      if (!user) {
        navigate("/login?redirect=/merchant");
        return;
      }
      
      const { data, error } = await getMerchantProfile();
      if (error) {
        // If no merchant profile exists, redirect to create one
        if (location.pathname !== "/merchant/settings") {
          navigate("/merchant/settings");
        }
      } else {
        setMerchant(data);
      }
      setLoading(false);
    };

    checkAuth();
  }, [user, navigate, location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const NavLink = ({ to, isActive, icon, children }: { to: string, isActive: boolean, icon: ReactNode, children: ReactNode }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={to} className="flex items-center">
          {icon}
          <span className="ml-2">{children}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  const MobileNavigation = () => (
    <div className="md:hidden flex justify-between items-center p-4 border-b">
      <div className="font-bold text-lg">
        {merchant ? merchant.store_name : "Merchant Dashboard"}
      </div>
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center py-4">
              <h2 className="font-bold text-lg">Menu</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 mt-6">
              <Link 
                to="/merchant" 
                className={`flex items-center p-2 rounded-md ${isActive('/merchant') ? 'bg-primary/10' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="mr-2" size={20} />
                Dashboard
              </Link>
              <Link 
                to="/merchant/products" 
                className={`flex items-center p-2 rounded-md ${isActive('/merchant/products') ? 'bg-primary/10' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Package2 className="mr-2" size={20} />
                Products
              </Link>
              <Link 
                to="/merchant/orders" 
                className={`flex items-center p-2 rounded-md ${isActive('/merchant/orders') ? 'bg-primary/10' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="mr-2" size={20} />
                Orders
              </Link>
              <Link 
                to="/merchant/settings" 
                className={`flex items-center p-2 rounded-md ${isActive('/merchant/settings') ? 'bg-primary/10' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="mr-2" size={20} />
                Settings
              </Link>
              <button 
                onClick={handleSignOut}
                className="flex items-center p-2 rounded-md text-left w-full"
              >
                <LogOut className="mr-2" size={20} />
                Sign Out
              </button>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="hidden md:flex">
          <SidebarHeader className="border-b px-6 py-5">
            <div className="font-bold text-lg">
              {merchant ? merchant.store_name : "Merchant Dashboard"}
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 py-6">
            <SidebarMenu>
              <NavLink to="/merchant" isActive={isActive('/merchant')} icon={<LayoutDashboard size={20} />}>
                Dashboard
              </NavLink>
              <NavLink to="/merchant/products" isActive={isActive('/merchant/products')} icon={<Package2 size={20} />}>
                Products
              </NavLink>
              <NavLink to="/merchant/orders" isActive={isActive('/merchant/orders')} icon={<ShoppingCart size={20} />}>
                Orders
              </NavLink>
              <NavLink to="/merchant/settings" isActive={isActive('/merchant/settings')} icon={<Settings size={20} />}>
                Settings
              </NavLink>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="mt-auto border-t p-4">
            <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
              <LogOut className="mr-2" size={20} /> Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <MobileNavigation />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MerchantLayout;
