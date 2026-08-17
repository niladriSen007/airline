import { Button } from "@/components/ui/button";
import { Globe, ThumbsUp, Wallet, Zap, ArrowRight } from "lucide-react";
import content from "@/constants/content.json";

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  globe: <Globe className="w-8 h-8 text-blue-600" />,
  thumbsup: <ThumbsUp className="w-8 h-8 text-blue-600" />,
  wallet: <Wallet className="w-8 h-8 text-blue-600" />,
  zap: <Zap className="w-8 h-8 text-blue-600" />,
};

const features: Feature[] = content.whyChooseUs.features.map(
  (feature: any) => ({
    ...feature,
    icon: iconMap[feature.icon],
  }),
);

export default function WhyChooseUs() {
  return (
    <div className="w-full bg-gray-50 py-28 px-12">
      <div className="max-w-8xl mx-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - Features */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {content.whyChooseUs.heading}{" "}
              <span className="text-blue-600 italic">
                {content.whyChooseUs.brandName}
              </span>
            </h2>
            <div className="w-12 h-1 bg-blue-200 mb-12" />

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.id} className="space-y-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - CTA Card */}
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=500&fit=crop"
              alt="Adventure awaits"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-800/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              {/* Top Tag */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                <span className="text-white font-semibold text-sm">
                  {content.whyChooseUs.cta.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2 leading-tight">
                    {content.whyChooseUs.cta.heading}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {content.whyChooseUs.cta.description}
                  </p>
                </div>

                <Button className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-6 py-2 font-semibold flex items-center gap-2 w-fit">
                  {content.whyChooseUs.cta.button}
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
