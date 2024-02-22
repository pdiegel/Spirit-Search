"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "@/components/loading";
import Image from "next/image";
import IngredientPicker from "@/components/ingredientPicker";
import { useState, useEffect } from "react";
import { getUserAllergies, setUserAllergies } from "@/helpers/mongodbFuncs";
import GenericError from "@/components/errors/genericError";

export default function UserProfilePage() {
  const { user, isLoading } = useUser();
  const [ingredients, setIngredients] = useState(new Set() as Set<string>);
  const [pickedAllergies, setPickedAllergies] = useState([] as string[]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setError("Error fetching ingredients");
          return;
        }
        setIngredients(data);
      });

    if (user?.sub) {
      getUserAllergies(user.sub).then((allergies) => {
        setPickedAllergies(allergies);
      });
    }
  }, [user]);

  const handlePickedAllergies = (i: string): void => {
    let newAllergies;
    if (pickedAllergies.includes(i)) {
      newAllergies = pickedAllergies.filter((ingredient) => ingredient !== i);
    } else {
      newAllergies = [...pickedAllergies, i];
    }

    setPickedAllergies(newAllergies);
    if (user?.sub) setUserAllergies(user.sub, newAllergies);

    return;
  };

  if (isLoading || (ingredients.size === 0 && !error)) return <Loading />;

  if (!user) return <div>Not logged in</div>;

  return (
    <main className="flex min-h-screen flex-col p-4 bg-accent w-full wrapper">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold my-2">User Profile</h1>
          <p>Hi, {user?.nickname}</p>
          <p>{user?.email}</p>
        </div>
        <Image
          src={user?.picture || ""}
          alt={user?.nickname || "User"}
          width={80}
          height={80}
          className="rounded-full shadow-md h-[80px] self-center"
        />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Allergies</h2>
        {error ? (
          <GenericError text={error} />
        ) : (
          <IngredientPicker
            availableIngredients={ingredients}
            pickedIngredients={pickedAllergies}
            onSelection={handlePickedAllergies}
          />
        )}
      </div>
    </main>
  );
}
