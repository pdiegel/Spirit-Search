"use client";

import { useState } from "react";

export default function SearchBar({
  onSearch,
  onClear,
}: {
  onSearch: (search: string) => void;
  onClear: () => void;
}) {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="bg-textPrimary text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary w-full"
        onChange={(e) => {
          onSearch(e.target.value);
          setSearchKey(e.target.value);
        }}
        value={searchKey}
        placeholder="Search"
      />
      <button
        onClick={() => {
          onClear();
          setSearchKey("");
        }}
        className="button-category"
      >
        Clear
      </button>
    </div>
  );
}
