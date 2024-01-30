"use client";
import { useState } from "react";

export default function DropDownSelector({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className="p-4" onClick={() => setIsOpen(!isOpen)}>
        {label}
        <span>X</span>
      </button>
      <div className={`${isOpen ? "hidden" : ""}`}>{children}</div>
    </div>
  );
}
