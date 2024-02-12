import { User } from "@/app/page";

export function getUserAllergies(sub: string | null | undefined) {
  if (!sub) return Promise.resolve([]);
  return fetch(`/api/mongodb/allergies?sub=${sub}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function setUserAllergies(
  sub: string | null | undefined,
  allergies: string[]
) {
  if (!sub) return Promise.resolve({ message: "No user found" });
  return fetch(`/api/mongodb/allergies?sub=${sub}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(allergies),
  }).then((res) => res.json());
}

export function updateUserData(userData: User) {
  if (!userData.sub) return Promise.resolve({ message: "No user found" });
  return fetch(`/api/mongodb/user?sub=${userData.sub}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((res) => res.json());
}

export function getUserData(sub: string | null | undefined) {
  if (!sub) return Promise.resolve({ message: "No user found" });
  return fetch(`/api/mongodb/user?sub=${sub}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
