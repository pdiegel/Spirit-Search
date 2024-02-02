"use client";
import DropDownSelector from "@/components/dropDownSelector";
import { useEffect, useState } from "react";

export default function Home() {
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{apiData}</p>
    </main>
  );
}
