"use client";
import DropDownSelector from "@/components/dropDownSelector";
import { useEffect, useState } from "react";

export default function Home() {
  const [apiData, setApiData] = useState({} as any);
  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
      });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{apiData && apiData.message}</p>
    </main>
  );
}
