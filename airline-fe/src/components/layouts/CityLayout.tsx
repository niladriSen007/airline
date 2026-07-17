import { Outlet } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import Navbar from "../shadcn-space/blocks/navbar-01/navbar";
import { useTheme } from "@/provider/theme/theme-provider";
import { cn } from "@/lib/utils";

const CityLayout = () => {
  const { theme } = useTheme();

  const handleGoBack = () => {
    window.history.back();
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDark
          ? "bg-linear-to-b from-black to-lime-950"
          : "bg-white text-black",
      )}
    >
      <Navbar />
      <Button
        variant={"secondary"}
        className="absolute top-24 left-24 bg-zinc-800 text-white duration-300 hover:bg-zinc-900 shadow-xl cursor-pointer"
        onClick={handleGoBack}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} />
        Go Back
      </Button>
      <Outlet />
    </div>
  );
};

export default CityLayout;
