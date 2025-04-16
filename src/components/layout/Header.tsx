
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDialog from "@/components/search/SearchDialog";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = () => {
    // Navigate to login if not logged in, or to account page if logged in
    // For now, always navigate to login
    navigate("/login");
  };

  const handleCartClick = () => {
    // Navigate to cart page
    navigate("/cart");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-semibold text-primary">StyleRent</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/women" className="text-sm font-medium hover:text-primary transition-colors">
              Women
            </Link>
            <Link to="/men" className="text-sm font-medium hover:text-primary transition-colors">
              Men
            </Link>
            <Link to="/designer" className="text-sm font-medium hover:text-primary transition-colors">
              Designer
            </Link>
            <Link to="/new" className="text-sm font-medium hover:text-primary transition-colors">
              New Arrivals
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <SearchDialog mobileView={false}>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search h-5 w-5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="sr-only">Search</span>
            </Button>
          </SearchDialog>
          
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={handleUserClick}>
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleCartClick}>
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/women"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              to="/men"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              to="/designer"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Designer
            </Link>
            <Link
              to="/new"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <div className="pt-2">
              <SearchDialog mobileView={true}>
                <Button variant="ghost" size="sm" className="w-full justify-start px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search h-4 w-4 mr-2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Search
                </Button>
              </SearchDialog>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start px-2"
                onClick={() => {
                  handleUserClick();
                  setMobileMenuOpen(false);
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
