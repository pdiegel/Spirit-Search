import { Cocktail, OriginalCocktail } from "@/interfaces/cocktails";

class CocktailDbClient {
  private cocktails: Cocktail[];
  private ingredients?: string[];

  constructor(cocktails: OriginalCocktail[], ingredients?: string[]) {
    this.cocktails = this.remapCocktails(cocktails);
    if (ingredients) {
      this.ingredients = ingredients;
    }
  }

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

  private getValueListFromKeys(cocktail: OriginalCocktail, key: string) {
    const values = Object.keys(cocktail)
      .filter((k) => k.includes(key) && cocktail[k as keyof OriginalCocktail])
      .map((k) => cocktail[k as keyof OriginalCocktail]?.toLowerCase());

    if (typeof values === "string") {
      return values;
    }
    return [];
  }
}
