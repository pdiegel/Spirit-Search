import { Cocktail } from "@/interfaces/cocktails";
import { CocktailDbClient } from "@/helpers/cocktailClass";
import fetchMock from "jest-fetch-mock";
import { Ingredient } from "@/interfaces/ingredient";

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  // Restore console.error after each test
  (console.error as jest.Mock).mockRestore();
});

const API_KEY = process.env.NEXT_COCKTAIL_DB_API_KEY;
const mockIngredients = ["Egg", "Gin"];
const mockAllergies = ["Vodka", "Lemon"];
const cocktailDBClient = new CocktailDbClient();
const mockCocktailID = "123";

// Mock cocktails with duplicate entry for testing purposes
const mockCocktails = {
  drinks: [
    {
      idDrink: mockCocktailID,
      strDrink: "Mojito",
      strDrinkAlternate: "",
      strTags: "Refreshing,Summer",
      strVideo: "",
      strCategory: "Cocktail",
      strIBA: "Contemporary Classics",
      strAlcoholic: "Alcoholic",
      strGlass: "Highball glass",
      strInstructions: "Muddle mint leaves with sugar and lime juice...",
      strDrinkThumb: "/path/to/thumbnail.jpg",
      strIngredient1: mockIngredients[0],
      strIngredient2: mockIngredients[1],
      strMeasure1: "2-3 oz",
      strImageSource: "",
      strCreativeCommonsConfirmed: "Yes",
      dateModified: "2017-09-03 12:00:00",
      strInstructionsES: "",
      strInstructionsFR: "",
      strInstructionsIT: "",
      "strInstructionsZH-HANS": "",
      "strInstructionsZH-HANT": "",
      strIngredient3: "",
      strIngredient8: "",
      strIngredient9: "",
      strIngredient10: "",
      strIngredient11: "",
      strIngredient12: "",
      strIngredient13: "",
      strIngredient14: "",
      strIngredient15: "",
      strMeasure2: "",
      strMeasure3: "",
      strMeasure8: "",
      strMeasure9: "",
      strMeasure10: "",
      strMeasure11: "",
      strMeasure12: "",
      strMeasure13: "",
      strMeasure14: "",
      strMeasure15: "",
    },
    {
      idDrink: mockCocktailID,
      strDrink: "Mojito",
      strDrinkAlternate: "",
      strTags: "Refreshing,Summer",
      strVideo: "",
      strCategory: "Cocktail",
      strIBA: "Contemporary Classics",
      strAlcoholic: "Alcoholic",
      strGlass: "Highball glass",
      strInstructions: "Muddle mint leaves with sugar and lime juice...",
      strDrinkThumb: "/path/to/thumbnail.jpg",
      strIngredient1: mockIngredients[0],
      strIngredient2: mockIngredients[1],
      strMeasure1: "2-3 oz",
      strImageSource: "",
      strCreativeCommonsConfirmed: "Yes",
      dateModified: "2017-09-03 12:00:00",
      strInstructionsES: "",
      strInstructionsFR: "",
      strInstructionsIT: "",
      "strInstructionsZH-HANS": "",
      "strInstructionsZH-HANT": "",
      strIngredient3: "",
      strIngredient8: "",
      strIngredient9: "",
      strIngredient10: "",
      strIngredient11: "",
      strIngredient12: "",
      strIngredient13: "",
      strIngredient14: "",
      strIngredient15: "",
      strMeasure2: "",
      strMeasure3: "",
      strMeasure8: "",
      strMeasure9: "",
      strMeasure10: "",
      strMeasure11: "",
      strMeasure12: "",
      strMeasure13: "",
      strMeasure14: "",
      strMeasure15: "",
    },
  ],
};

const expectedOutput: Cocktail[] = [
  {
    cocktailId: mockCocktailID,
    name: "Mojito",
    alternateName: "",
    tags: "Refreshing,Summer",
    video: "",
    category: "Cocktail",
    iba: "Contemporary Classics",
    isAlcoholic: "Alcoholic",
    glassType: "Highball glass",
    instructions: "Muddle mint leaves with sugar and lime juice...",
    thumbnail: "/path/to/thumbnail.jpg",
    ingredients: ["egg", "gin", "", "", "", "", "", "", "", "", ""],
    measures: ["2-3 oz", "", "", "", "", "", "", "", "", "", ""],
    imageSource: "",
    isCreativeCommons: "Yes",
    dateModified: "2017-09-03 12:00:00",
  },
];

const duplicateCocktails: Cocktail[] = [
  {
    cocktailId: mockCocktailID,
    name: "Mojito",
    alternateName: "",
    tags: "Refreshing,Summer",
    video: "",
    category: "Cocktail",
    iba: "Contemporary Classics",
    isAlcoholic: "Alcoholic",
    glassType: "Highball glass",
    instructions: "Muddle mint leaves with sugar and lime juice...",
    thumbnail: "/path/to/thumbnail.jpg",
    ingredients: ["egg", "gin", "", "", "", "", "", "", "", "", ""],
    measures: ["2-3 oz", "", "", "", "", "", "", "", "", "", ""],
    imageSource: "",
    isCreativeCommons: "Yes",
    dateModified: "2017-09-03 12:00:00",
  },
  {
    cocktailId: mockCocktailID,
    name: "Mojito",
    alternateName: "",
    tags: "Refreshing,Summer",
    video: "",
    category: "Cocktail",
    iba: "Contemporary Classics",
    isAlcoholic: "Alcoholic",
    glassType: "Highball glass",
    instructions: "Muddle mint leaves with sugar and lime juice...",
    thumbnail: "/path/to/thumbnail.jpg",
    ingredients: ["egg", "gin", "", "", "", "", "", "", "", "", ""],
    measures: ["2-3 oz", "", "", "", "", "", "", "", "", "", ""],
    imageSource: "",
    isCreativeCommons: "Yes",
    dateModified: "2017-09-03 12:00:00",
  },
];

const mockIngredientData = {
  ingredients: [
    {
      idIngredient: "1",
      strIngredient: mockIngredients[0],
      strDescription: "Egg is a common ingredient in many cocktails.",
      strType: "Egg",
      strAlcohol: "No",
      strABV: "0",
    },
  ],
};

test("fetchAllCocktails", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockCocktails));

  const resultPromise = cocktailDBClient.fetchAllCocktails();

  await expect(resultPromise).resolves.toEqual(expectedOutput);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/search.php?s=`
  );
});

test("fetchAllCocktails no cocktails found", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ drinks: [] }));

  const resultPromise = cocktailDBClient.fetchAllCocktails();

  await expect(resultPromise).resolves.toEqual([]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/search.php?s=`
  );
});

test("fetchAllCocktails response error", async () => {
  fetchMock.mockReject(new Error("API Error"));

  const resultPromise = cocktailDBClient.fetchAllCocktails();

  await expect(resultPromise).resolves.toEqual([]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/search.php?s=`
  );
});

test("fetchCocktailsByIngredient", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockCocktails));

  const resultPromise = cocktailDBClient.fetchCocktailsByIngredient(
    mockIngredients[0]
  );

  await expect(resultPromise).resolves.toEqual(expectedOutput);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/filter.php?i=${mockIngredients[0]}`
  );
});

test("fetchCocktailsByIngredient that is not found", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ drinks: [] }));

  const resultPromise = cocktailDBClient.fetchCocktailsByIngredient(
    "Nonexistent Ingredient"
  );

  await expect(resultPromise).resolves.toEqual([]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/filter.php?i=Nonexistent Ingredient`
  );
});

test("fetchCocktailsByIngredient response error", async () => {
  fetchMock.mockReject(new Error("API Error"));

  const resultPromise = cocktailDBClient.fetchCocktailsByIngredient(
    mockIngredients[0]
  );

  await expect(resultPromise).resolves.toEqual([]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/filter.php?i=${mockIngredients[0]}`
  );
});

test("fetchCocktailById", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockCocktails));

  const resultPromise = cocktailDBClient.fetchCocktailById(mockCocktailID);

  await expect(resultPromise).resolves.toEqual(expectedOutput[0]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/lookup.php?i=${mockCocktailID}`
  );
});

test("fetchCocktailById that is not found", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ drinks: [] }));

  const resultPromise = cocktailDBClient.fetchCocktailById("Nonexistent ID");

  await expect(resultPromise).resolves.toEqual({} as Cocktail);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/lookup.php?i=Nonexistent ID`
  );
});

test("fetchCocktailById response error", async () => {
  fetchMock.mockReject(new Error("API Error"));

  const resultPromise = cocktailDBClient.fetchCocktailById(mockCocktailID);

  await expect(resultPromise).resolves.toEqual({} as Cocktail);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/lookup.php?i=${mockCocktailID}`
  );
});

test("getUniqueCocktailIngredients", () => {
  const result =
    cocktailDBClient.getUniqueCocktailIngredients(duplicateCocktails);

  // This method converts the ingredients to lowercase
  const expectedIngredients = new Set(
    mockIngredients.map((i) => i.toLowerCase())
  );
  expect(result).toEqual(expectedIngredients);
});

test("fetchAllIngredients", async () => {
  // The API returns a list of ingredients in the form of an array of objects
  // with a single key, drinks, which contains an array of objects with a single
  // key, strIngredient1. We only need the value of strIngredient1.
  const genericIngredientReponse = {
    drinks: mockIngredients.map((i) => ({
      strIngredient1: i,
    })),
  };

  fetchMock.mockResponseOnce(JSON.stringify(genericIngredientReponse));

  const resultPromise = cocktailDBClient.fetchAllIngredients();

  await expect(resultPromise).resolves.toEqual(mockIngredients);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/list.php?i=list`
  );
});

test("fetchAllIngredients no ingredients found", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ drinks: [] }));

  const resultPromise = cocktailDBClient.fetchAllIngredients();

  await expect(resultPromise).resolves.toEqual([]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/list.php?i=list`
  );
});

test("fetchAllIngredients response error", async () => {
  fetchMock.mockReject(new Error("API Error"));

  const resultPromise = cocktailDBClient.fetchAllIngredients();

  await expect(resultPromise).resolves.toEqual([]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/list.php?i=list`
  );
});

test("fetchIngredientDataByName", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockIngredientData));

  const resultPromise = cocktailDBClient.fetchIngredientDataByName(
    mockIngredients[0]
  );

  await expect(resultPromise).resolves.toEqual({
    ingredientId: mockIngredientData.ingredients[0].idIngredient,
    name: mockIngredients[0],
    description: mockIngredientData.ingredients[0].strDescription,
    type: mockIngredientData.ingredients[0].strType,
    containsAlcohol: mockIngredientData.ingredients[0].strAlcohol,
    alcoholByVolume: mockIngredientData.ingredients[0].strABV,
  } as Ingredient);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/search.php?i=${mockIngredients[0]}`
  );
});

test("fetchIngredientDataByName that is not found", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ ingredients: [] }));

  const resultPromise = cocktailDBClient.fetchIngredientDataByName(
    "Nonexistent Ingredient"
  );

  await expect(resultPromise).resolves.toEqual({} as Ingredient);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/search.php?i=Nonexistent Ingredient`
  );
});

test("fetchIngredientDataById response error", async () => {
  fetchMock.mockReject(new Error("API Error"));

  const resultPromise = cocktailDBClient.fetchIngredientDataByName(
    mockIngredients[0]
  );

  await expect(resultPromise).resolves.toEqual({} as Ingredient);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toEqual(
    `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/search.php?i=${mockIngredients[0]}`
  );
});

test("filterCocktails by allergies", () => {
  const result = cocktailDBClient.filterCocktails(
    mockAllergies,
    expectedOutput,
    []
  );

  const expected = expectedOutput.filter(
    (c) => !c.ingredients.some((i) => mockAllergies.includes(i.toLowerCase()))
  );

  expect(result).toEqual(expected);
});

test("filterCocktails by allergies with no cocktails", () => {
  const result = cocktailDBClient.filterCocktails(mockAllergies, [], []);

  expect(result).toEqual([]);
});

test("filterCocktails by ingredients", () => {
  const result = cocktailDBClient.filterCocktails(
    [],
    expectedOutput,
    mockIngredients
  );

  const expected = expectedOutput.filter((c) =>
    mockIngredients.every((i) => c.ingredients.includes(i.toLowerCase()))
  );

  expect(result).toEqual(expected);
});

test("filterCocktails by ingredients with no cocktails", () => {
  const result = cocktailDBClient.filterCocktails(mockIngredients, [], []);

  expect(result).toEqual([]);
});
