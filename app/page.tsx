"use client";
import DropDownSelector from "@/components/dropDownSelector";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
