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

  if (isLoading) return <div>Loading...</div>;

  if (user) console.log(user);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-accent text-text">
      <p>{apiData && apiData.message}</p>

      {user ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </main>
  );
}
