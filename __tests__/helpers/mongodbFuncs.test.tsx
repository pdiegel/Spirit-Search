import { User } from "@/app/page";
import {
  getUserAllergies,
  setUserAllergies,
  updateUserData,
  getUserData,
} from "@/helpers/mongodbFuncs"; // Adjust the import path
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

const mockUserSub = "user-sub";
const mockAllergies = ["Vodka", "Lemon"];
const mockCocktails = ["Margarita", "Martini"];

// getUserAllergies tests ----------------------------------------------
test("getUserAllergies returns allergies for a valid sub", async () => {
  // Mock the fetch response
  fetchMock.mockResponseOnce(JSON.stringify(mockAllergies));

  const result = await getUserAllergies(mockUserSub);

  // Assert that fetch was called with the correct URL
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `/api/mongodb/allergies?sub=${mockUserSub}`
  );

  // Assert on the response
  expect(result).toEqual(mockAllergies);

  // Assert that fetch was called exactly once
  expect(fetchMock).toHaveBeenCalledTimes(1);

  // Assert on the fetch options
  expect(fetchMock.mock.calls[0][1]).toMatchObject({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

test("getUserAllergies returns an empty array for an empty sub", async () => {
  const result = await getUserAllergies("");
  expect(result).toEqual([]);
});

// setUserAllergies tests ----------------------------------------------
test("setUserAllergies sets the correct supplied allergies", async () => {
  // Mock the fetch response
  fetchMock.mockResponseOnce(JSON.stringify({}));

  const result = await setUserAllergies(mockUserSub, mockAllergies);

  // Assert that fetch was called with the correct URL
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `/api/mongodb/allergies?sub=${mockUserSub}`
  );

  // Assert on the response
  expect(result).toEqual({});

  // Assert that fetch was called exactly once
  expect(fetchMock).toHaveBeenCalledTimes(1);

  // Assert on the fetch options
  expect(fetchMock.mock.calls[0][1]).toMatchObject({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mockAllergies),
  });
});

test("setUserAllergies returns an error message for an empty sub", async () => {
  const result = await setUserAllergies("", mockAllergies);
  expect(result).toEqual({ message: "No user found" });
});

// getUserData tests ---------------------------------------------------
test("getUserData returns user data for a valid sub", async () => {
  const mockUserData = {
    sub: mockUserSub,
    name: "Test User",
    email: "",
    picture: "",
  };
  // Mock the fetch response
  fetchMock.mockResponseOnce(JSON.stringify(mockUserData));
  const result = await getUserData(mockUserSub);

  // Assert that fetch was called with the correct URL
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `/api/mongodb/user?sub=${mockUserSub}`
  );
  expect(result).toEqual(mockUserData);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  // Assert on the fetch options
  expect(fetchMock.mock.calls[0][1]).toMatchObject({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

test("getUserData returns an error message for an empty sub", async () => {
  const result = await getUserData("");
  expect(result).toEqual({ message: "No user found" });
});

// updateUserData tests ------------------------------------------------
test("updateUserData updates user data for a valid user", async () => {
  const mockUserData = {
    sub: mockUserSub,
    allergies: mockAllergies,
    favoriteCocktails: mockCocktails,
  } as User;
  // Mock the fetch response
  fetchMock.mockResponseOnce(JSON.stringify({}));

  const result = await updateUserData(mockUserData);

  // Assert that fetch was called with the correct URL
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `/api/mongodb/user?sub=${mockUserSub}`
  );

  // Assert on the response
  expect(result).toEqual({});

  // Assert that fetch was called exactly once
  expect(fetchMock).toHaveBeenCalledTimes(1);

  // Assert on the fetch options
  expect(fetchMock.mock.calls[0][1]).toMatchObject({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mockUserData),
  });

  // Assert that the user data is updated correctly
  expect(fetchMock.mock.calls[0][1]?.body).toEqual(
    JSON.stringify(mockUserData)
  );
});

test("updateUserData returns an error message for an empty sub", async () => {
  const result = await updateUserData({} as User);
  expect(result).toEqual({ message: "No user found" });
});
