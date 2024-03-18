"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import DownArrowImg from "@/public/arrowDown.svg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterDropDown({
  heading,
  filters,
  selectedFilters,
  onFilterClick,
}: {
  heading: string;
  filters: string[];
  selectedFilters: string[];
  onFilterClick: MouseEventHandler<HTMLButtonElement>;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const expandDiv = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex gap-8" onClick={expandDiv}>
        <h3 className="text-3xl font-semibold">{heading}</h3>
        <Image
          src={DownArrowImg}
          height={30}
          width={30}
          alt="down arrow"
          className={`transform transition-transform ${
            isExpanded ? "rotate-0" : "-rotate-90"
          } duration-500`}
        />
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            key={`category-list-${heading}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2"
            layout
          >
            {filters.map((filter) => {
              const active = selectedFilters.includes(filter);
              return (
                <li key={filter}>
                  <button
                    onClick={onFilterClick}
                    className={`button-category ${active ? "active" : ""}`}
                  >
                    {filter}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
