"use client";

import React, { useState, type FC } from "react";
import { motion, Transition } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  AddSquareIcon,
  MessageNotification01Icon,
  NoteIcon,
  Search01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface DockItem {
  id: number;
  Icon: React.ElementType;
}

interface DockProps {
  items?: DockItem[];
}

const DEFAULT_DOCK_ITEMS: DockItem[] = [
  { id: 1, Icon: () => <HugeiconsIcon icon={Search01Icon} size={26} /> },
  { id: 2, Icon: () => <HugeiconsIcon icon={NoteIcon} size={26} /> },
  { id: 3, Icon: () => <HugeiconsIcon icon={AddSquareIcon} size={26} /> },
  {
    id: 4,
    Icon: () => <HugeiconsIcon icon={MessageNotification01Icon} size={26} />,
  },
  { id: 5, Icon: () => <HugeiconsIcon icon={Settings01Icon} size={26} /> },
];

const dockSpring: Transition = {
  stiffness: 300,
  damping: 22,
  mass: 0.7,
};

export const Dock: FC<DockProps> = ({ items }) => {
  const dockItems = items ?? DEFAULT_DOCK_ITEMS;
  const [selected, setSelected] = useState<number | null>(null);
  const [animateSelected, setAnimateSelected] = useState<number | null>(null);

  const actions: Record<number, () => void> = {
    1: () => console.log("Show action triggered"),
    2: () => console.log("Edit action triggered"),
    3: () => console.log("Delete action triggered"),
  };

  function handleAction(itemId: number) {
    const action = actions[itemId];
    if (action) {
      action();
    } else {
      console.log(`No action defined for item with id ${itemId}`);
    }
  }

  const handleClick = (id: number) => {
    setSelected(id);
    setAnimateSelected(id);
    setTimeout(() => {
      setAnimateSelected(null);
    }, 200);
  };

  return (
    <div className="flex flex-col transition-colors duration-500">
      <motion.div
        layout
        transition={dockSpring}
        className="relative flex items-end rounded-3xl shadow-sm"
      >
        {dockItems.map((item) => (
          <motion.div
            key={item.id}
            className="relative"
            onClick={() => {
              handleClick(item.id);
              handleAction(item.id);
            }}
            style={{
              transformOrigin: "bottom",
            }}
            initial={{
              scale: 1,
            }}
            whileHover={{
              y: -4,
            }}
            animate={{
              scale: animateSelected === item.id ? 1.3 : 1,
              y: animateSelected === item.id ? -6 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 550,
              damping: 15,
              mass: 1.1,
            }}
          >
            <motion.div className="cursor-pointer rounded-md p-2 ">
              <item.Icon
                className={cn(
                  "size-4 text-zinc-500 transition-all duration-200 dark:text-zinc-600",
                  selected === item.id && "text-zinc-700",
                )}
              />
            </motion.div>

            <motion.div
              className={cn(
                "absolute mt-px flex w-full items-center justify-center opacity-0 transition-opacity duration-400 will-change-transform",
                selected === item.id && "opacity-100",
              )}
            >
              <div
                className="rounded-full bg-zinc-200 dark:bg-zinc-700"
                style={{
                  width: 4,
                  height: 4,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
