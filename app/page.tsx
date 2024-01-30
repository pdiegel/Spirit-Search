"use client";
import DropDownSelector from "@/components/dropDownSelector";
import { useState } from "react";

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
];
// https://www.thecocktaildb.com/api.php

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState([]) as any;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <DropDownSelector label="Test Dropdown">
          <div className="absolute bg-white border rounded-lg shadow-lg flex flex-col p-2">
            {options.map((option) => (
              <label key={option.id}>
                <input
                  type="checkbox"
                  value={option.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedOptions([...selectedOptions, option]);
                    } else {
                      setSelectedOptions(
                        selectedOptions.filter(
                          (selectedOption: any) =>
                            selectedOption.id !== option.id
                        )
                      );
                    }
                  }}
                />
                {option.label}
              </label>
            ))}
          </div>
        </DropDownSelector>
        <div className="flex flex-col">
          {selectedOptions.map((option: any) => (
            <div key={option.id}>{option.label}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
