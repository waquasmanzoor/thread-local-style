
import { Box, CalendarDays, PackageCheck, ShoppingBag, Shirt } from "lucide-react";

const steps = [
  {
    icon: Shirt,
    title: "Browse Collection",
    description:
      "Explore hundreds of designer pieces from local boutiques",
  },
  {
    icon: CalendarDays,
    title: "Choose Rental Period",
    description:
      "Select 4 or 8 days depending on your needs",
  },
  {
    icon: ShoppingBag,
    title: "Check Out",
    description:
      "Enter delivery details and complete your payment securely",
  },
  {
    icon: PackageCheck,
    title: "Enjoy & Return",
    description:
      "Wear your items and return using the prepaid packaging",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold">How It Works</h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Renting designer fashion is easy with StyleRent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
