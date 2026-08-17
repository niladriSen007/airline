import { EditProfile } from "@/components/ui/edit-city";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

const ShowCityDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "James Carter",
    email: "jamescarter1930@gmail.com",
    timezone: "GMT-8",
    workingHours: "10 AM – 6 PM",
    title: "Project manager",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop",
    lastUpdated: "Dec 24, 2025",
  });

  const handleSave = (newData: any) => {
    setProfile(newData);
    setIsModalOpen(false);
  };

  return (
    <div
      className={`relative flex min-h-full w-full flex-col items-center justify-center overflow-hidden bg-transparent p-4 transition-colors duration-500`}
    >
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-[#0F0F0F] py-4 text-[14px] font-bold text-white shadow-lg shadow-black/10 transition-all hover:bg-black active:scale-95 sm:text-[16px] dark:bg-white dark:text-black dark:shadow-white/5 dark:hover:bg-gray-200"
      >
        <Pencil size={18} strokeWidth={2.5} />
        Edit Profile
      </button>

      {/* Modal Component */}
      <EditProfile
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={profile}
        onSave={handleSave}
      />
    </div>
  );
};

export default ShowCityDialog;
