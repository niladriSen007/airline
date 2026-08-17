import Navbar from "@/components/shadcn-space/blocks/navbar-01/navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import FlightSearchCard from "@/components/shared/FlightSearchCard";
import BenefitsSection from "@/components/shared/BenefitsSection";
import PopularDestinations from "@/components/shared/PopularDestinations";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import content from "@/constants/content.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Background Image */}
      <img
        src="home_banner.png"
        className="fixed inset-0 z-[-1] h-[calc(100vh-200px)] w-full object-cover"
      />

      {/* Hero Section */}
      <div className="flex max-w-7xl items-center justify-start min-h-[calc(100vh-32rem)] px-12 sm:px-48 py-12">
        <div className="max-w-2xl space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 backdrop-blur-sm">
            <span className="text-blue-600 text-lg">
              {content.hero.tagIcon}
            </span>
            <span className="text-gray-700 font-semibold text-sm">
              {content.hero.tag}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              {content.hero.heading1}
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold italic text-blue-600">
              {content.hero.heading2}
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-white leading-relaxed max-w-lg">
            {content.hero.description}
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-semibold group"
          >
            {content.hero.ctaButton}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Button>
        </div>
      </div>

      {/* Flight Search Card */}
      <FlightSearchCard />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Why Choose Us */}
      <WhyChooseUs />

      <Outlet />
    </div>
  );
}
