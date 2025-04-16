
import Container from "@/components/layout/Container";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <HowItWorks />
      <NewArrivals />
      <Testimonials />
      
      <section className="py-12 md:py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-lg mx-auto">
            Join StyleRent today and access thousands of designer pieces for a fraction of the retail price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-white/90">
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Index;
