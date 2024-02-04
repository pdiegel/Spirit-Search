"use client";
import DropDownSelector from "@/components/dropDownSelector";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const [apiData, setApiData] = useState({} as any);
  const { user, error, isLoading } = useUser();

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
      <a href="/api/auth/login">Login</a>
    </main>
  );
}
