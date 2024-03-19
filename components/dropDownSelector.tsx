"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DropDownSelector({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className="text-2xl pl-0" onClick={() => setIsOpen(!isOpen)}>
        <span>{icon}</span>
      </button>
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: isOpen ? 0 : "-120vw" }}
        transition={{ duration: 0.4 }}
        className={`flex flex-col p-4 bg-primary fixed left-0 top-0 h-full w-60 z-10 shadow-2xl gap-4`}
      >
        <button
          className="self-start text-2xl w-8, h-8 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          X
        </button>
        {children}
      </motion.div>
    </div>
  );
}
