import { Cocktail, OriginalCocktail } from "@/interfaces/cocktails";
import { Ingredient } from "@/interfaces/ingredient";

export class CocktailDbClient {
  // Revalidate every 10 hours
  private revalidateSeconds = 36000;
  private baseUrl = "https://www.thecocktaildb.com/api/json/v2/9973533";

  private remapCocktails(cocktails: OriginalCocktail[]): Cocktail[] {
    return cocktails.map((cocktail) => {
      return {
        cocktailId: cocktail.idDrink,
        name: cocktail.strDrink,
        alternateName: cocktail.strDrinkAlternate,
        tags: cocktail.strTags,
        video: cocktail.strVideo,
        category: cocktail.strCategory,
        iba: cocktail.strIBA,
        isAlcoholic: cocktail.strAlcoholic,
        glassType: cocktail.strGlass,
        instructions: cocktail.strInstructions,
        thumbnail: cocktail.strDrinkThumb,
        ingredients: this.getValueListFromKeys(cocktail, "strIngredient"),
        measures: this.getValueListFromKeys(cocktail, "strMeasure"),
        imageSource: cocktail.strImageSource,
        isCreativeCommons: cocktail.strCreativeCommonsConfirmed,
        dateModified: cocktail.dateModified,
      };
    });
  }

  private getValueListFromKeys(
    cocktail: OriginalCocktail,
    key: string
  ): string[] {
    return Object.keys(cocktail)
      .filter(
        (k) =>
          k.includes(key) &&
          typeof cocktail[k as keyof OriginalCocktail] === "string"
      )
      .map((k) => {
        const value = cocktail[k as keyof OriginalCocktail];
        return (value as string).toLowerCase();
      });
  }

  private filterOutDuplicateCocktails(cocktails: Cocktail[]): Cocktail[] {
    const uniqueCocktails = new Set();

    return cocktails.filter((cocktail) => {
      if (uniqueCocktails.has(cocktail.name.toLowerCase())) {
        return false;
      }
      uniqueCocktails.add(cocktail.name.toLowerCase());
      return true;
    });
  }

  private formatCocktails(cocktails: OriginalCocktail[]): Cocktail[] {
    const remappedCocktails = this.remapCocktails(cocktails);
    return this.filterOutDuplicateCocktails(remappedCocktails);
  }

  private filterCocktailsByIngredients(
    cocktails: Cocktail[],
    ingredients: string[]
  ): Cocktail[] {
    // Convert pickedIngredients to a Set for efficient lookup
    const ingredientSet = new Set(
      ingredients.map((ingredient) => ingredient.toLowerCase())
    );

    // Filter cocktails based on picked ingredients
    return cocktails.filter((cocktail: any) =>
      // Ensure that every ingredient is present in the cocktail's ingredients
      [...ingredientSet].every((ingredient) =>
        cocktail.ingredients.includes(ingredient)
      )
    );
  }

  private filterCocktailsByAllergies(
    cocktails: Cocktail[],
    allergies: string[]
  ): Cocktail[] {
    if (allergies.length === 0) {
      return cocktails;
    }

    // Filter out cocktails with ingredients that the user is allergic to
    return cocktails.filter(
      (cocktail: any) =>
        !allergies.some((allergy) =>
          cocktail.ingredients.includes(allergy.toLowerCase())
        )
    );
  }

  filterCocktails(
    ingredients: string[],
    allergies: string[],
    cocktails: Cocktail[]
  ): Cocktail[] {
    let filteredCocktails = cocktails;
    filteredCocktails = this.filterCocktailsByIngredients(
      filteredCocktails,
      ingredients
    );
    filteredCocktails = this.filterCocktailsByAllergies(
      filteredCocktails,
      allergies
    );
    return filteredCocktails;
  }

  async fetchAllCocktails(): Promise<Cocktail[]> {
    const request = await fetch(`${this.baseUrl}/search.php?s=`, {
      next: { revalidate: this.revalidateSeconds },
    });
    const data = await request.json();

    return this.formatCocktails(data.drinks);
  }

  async fetchCocktailsByIngredient(ingredient: string): Promise<Cocktail[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/filter.php?i=${ingredient}`,
        {
          next: { revalidate: this.revalidateSeconds },
        }
      );
      const data = await response.json();
      return this.formatCocktails(data.drinks);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async fetchCocktailById(id: string): Promise<Cocktail> {
    try {
      const response = await fetch(`${this.baseUrl}/lookup.php?i=${id}`, {
        next: { revalidate: this.revalidateSeconds },
      });
      const data = await response.json();
      return this.formatCocktails(data.drinks)[0];
    } catch (error) {
      console.error(error);
      return {} as Cocktail;
    }
  }

  getUniqueCocktailIngredients(cocktails: Cocktail[]): Set<string> {
    const uniqueIngredients = new Set<string>(); // Use a Set to ensure uniqueness

    cocktails.forEach((cocktail) => {
      cocktail.ingredients.forEach((ingredient: string) => {
        if (ingredient) {
          uniqueIngredients.add(ingredient.toLowerCase());
        }
      });
    });

    return uniqueIngredients;
  }

  async fetchAllIngredients(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/list.php?i=list`, {
        next: { revalidate: this.revalidateSeconds },
      });
      const data = await response.json();
      return data.drinks.map((drink: any) => drink.strIngredient1);
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  async fetchIngredientDataByName(name: string): Promise<Ingredient> {
    try {
      const response = await fetch(`${this.baseUrl}/search.php?i=${name}`, {
        next: { revalidate: this.revalidateSeconds },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return {} as Ingredient;
    }
  }
}