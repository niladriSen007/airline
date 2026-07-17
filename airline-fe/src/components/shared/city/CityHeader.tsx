import { Button } from "@/components/ui/button";
import { PaginatedCityResponse } from "@/features/city/_types";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "@tanstack/react-router";

const CityHeader = ({ cityList }: { cityList: PaginatedCityResponse }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-xl font-semibold text-black dark:text-white">
          City Directory
        </h1>
        <p className="mt-0.5 text-sm text-black/40  dark:text-white/40">
          {cityList?.content?.length || 0} cities across the airline network
        </p>
      </div>
      <Button
        onClick={() => navigate({ to: "/city/create" })}
        className="cursor-pointer flex items-center gap-1.5 rounded-lg bg-black/80 dark:bg-white/10 px-3.5 py-2 text-sm font-medium text-white hover:bg-black  transition-colors duration-300"
      >
        <HugeiconsIcon icon={PlusSignIcon} />
        Add City
      </Button>
    </div>
  );
};

export default CityHeader;
