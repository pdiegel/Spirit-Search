"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import DownArrowImg from "@/public/arrowDown.svg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { selectedFilterType } from "./cocktailGrid";

export default function FilterDropDown({
  parameter,
  heading,
  filters,
  selectedFilters,
  onFilterClick,
}: {
  parameter: string;
  heading: string;
  filters: string[];
  selectedFilters: selectedFilterType;
  onFilterClick: MouseEventHandler<HTMLButtonElement>;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const expandDiv = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex flex-col gap-4 w-full`}>
      <div
        className="flex justify-between gap-8 cursor-pointer"
        onClick={expandDiv}
      >
        <h3 className="text-2xl font-semibold">{heading}</h3>
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
            className="flex flex-wrap gap-2 max-h-40 overflow-y-auto"
            layout
          >
            {filters.map((filter) => {
              const active = selectedFilters[parameter]?.has(filter);
              return (
                <li key={filter}>
                  <button
                    data-filter-type={parameter}
                    data-filter-value={filter}
                    onClick={(e) => onFilterClick(e)}
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
