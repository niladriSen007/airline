import { Dock } from "@/components/ui/dock";
import { CityData } from "@/features/city/_types";
import { Delete02Icon, Edit01Icon, EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Row } from "@tanstack/react-table";

const items = [
  {
    id: 1,
    Icon: () => <HugeiconsIcon icon={EyeIcon} />,
  },
  {
    id: 2,
    Icon: () => <HugeiconsIcon icon={Edit01Icon} className="text-green-500" />,
  },
  {
    id: 3,
    Icon: () => <HugeiconsIcon icon={Delete02Icon} className="text-red-500" />,
  },
];

const ActionColumn = ({ row }: { row: Row<CityData> }) => {
  return (
    <div className="flex items-center gap-2">
      <Dock items={items} />
    </div>
  );
};

export default ActionColumn;
