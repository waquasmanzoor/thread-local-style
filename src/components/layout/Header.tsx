
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";
import SearchDialog from "../search/SearchDialog";

const Header = () => {
  const navItems = [
    { label: "Women", href: "/women" },
    { label: "Men", href: "/men" },
    { label: "Designer", href: "/designer" },
    { label: "New", href: "/new" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background dark:bg-[#0F172A] dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-gradient">RE</span>STYLE
        </Link>

        <nav className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="text-sm font-medium hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="flex items-center space-x-4">
          <SearchDialog>
            <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </SearchDialog>
          <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground">
            <Link to="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground">
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
