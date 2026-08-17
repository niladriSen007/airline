import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import content from "@/constants/content.json";

interface Destination {
  id: number;
  name: string;
  location: string;
  price: number;
  badge: string;
  image: string;
  badgeColor: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Thailand",
    location: "Phuket",
    price: 699,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
    badgeColor: "bg-blue-500",
  },
  {
    id: 2,
    name: "France",
    location: "Paris",
    price: 799,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=400&fit=crop",
    badgeColor: "bg-pink-500",
  },
  {
    id: 3,
    name: "Bali, Indonesia",
    location: "Ubud",
    price: 599,
    badge: "Trending",
    image:
      "https://media.istockphoto.com/id/653953140/photo/hindu-temple-in-bali.jpg?s=612x612&w=0&k=20&c=ysj3S2kV1ZgCr4QZWDzjvHRowCI3-cR1xQNnqE8-BS4=",
    badgeColor: "bg-blue-600",
  },
  {
    id: 4,
    name: "Dubai, UAE",
    location: "Dubai",
    price: 899,
    badge: "Bestseller",
    image:
      "https://media.istockphoto.com/id/1154761064/photo/the-palm-island-panorama-with-dubai-marina-in-the-background-aerial.jpg?s=612x612&w=0&k=20&c=CypnNYt7O98dz20Vogn4IOhJD79nTFBMRC8pH4Ddgd0=",
    badgeColor: "bg-indigo-900",
  },
];

export default function PopularDestinations() {
  return (
    <div className="w-full bg-white py-16 px-12">
      <div className="max-w-8xl mx-40">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-bold text-gray-900">
              {content.popularDestinations.title}
            </h2>
            <span className="text-3xl">{content.popularDestinations.icon}</span>
          </div>
          <Button
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-6 py-2 flex items-center gap-2"
          >
            {content.popularDestinations.viewAllButton}
            <ArrowRight size={20} />
          </Button>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative h-100 duration-300 rounded-2xl overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              {/* Background Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Badge */}
              <div
                className={`absolute top-4 left-4 ${destination.badgeColor} text-white rounded-full px-4 py-1 text-sm font-semibold`}
              >
                {destination.badge}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 py-4 px-6 text-white backdrop-blur-xs">
                <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-300">From</p>
                    <p className="text-2xl font-bold">${destination.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
