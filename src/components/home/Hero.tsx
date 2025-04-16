
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-muted">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Hero Background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
          Rent Designer Fashion from Local Boutiques
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Elevate your style with high-end fashion at a fraction of the cost.
          Sustainable. Local. Beautiful.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="px-8">
            <Link to="/women">Shop Women</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/20 text-white border-white/40 hover:bg-white/30">
            <Link to="/men">Shop Men</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
