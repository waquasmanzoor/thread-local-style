
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    location: "New York, NY",
    rating: 5,
    comment:
      "StyleRent saved my night! I was able to wear a $1200 dress for my best friend's wedding for just $95. Delivery was on time and the return process was so easy.",
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "DC",
    location: "San Francisco, CA",
    rating: 5,
    comment:
      "I rented a suit for a job interview that would have cost me $800 to buy. The quality was exceptional and I felt confident walking into that room. Got the job too!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "ER",
    location: "Chicago, IL",
    rating: 4,
    comment:
      "Love the sustainability aspect of StyleRent. Instead of buying new outfits for every occasion, I can rent high-quality pieces and reduce my environmental impact.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Join thousands of satisfied customers who choose StyleRent for their
            special occasions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-muted rounded-lg p-6 border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i + testimonial.rating} className="w-4 h-4 text-muted-foreground" />
                  ))}
                </div>
              </div>
              <p className="text-sm">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
