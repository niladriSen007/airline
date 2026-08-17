import { CheckCircle, Headphones, Shield, Star } from "lucide-react";
import content from "@/constants/content.json";

interface Benefit {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  "Best Price Guarantee": <CheckCircle className="w-8 h-8 text-blue-600" />,
  "24/7 Customer Support": <Headphones className="w-8 h-8 text-blue-600" />,
  "Secure Bookings": <Shield className="w-8 h-8 text-blue-600" />,
  "Handpicked Experiences": <Star className="w-8 h-8 text-blue-600" />,
};

const benefits: Benefit[] = content.benefits.map((benefit) => ({
  ...benefit,
  icon: iconMap[benefit.title],
}));

export default function BenefitsSection() {
  return (
    <div className="w-full bg-white pt-28 pb-16  px-12">
      <div className="max-w-8xl mx-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  {benefit.icon}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
