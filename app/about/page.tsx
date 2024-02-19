export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-4 bg-accent w-full wrapper">
      <h1 className="text-3xl font-bold mt-2">About Spirit Search</h1>
      <h3 className="mt-6 text-2xl font-bold">Explore Cocktails Simplified</h3>
      <p className="mt-2">
        SpiritSearch is your straightforward solution to finding cocktail
        recipes that match your home bar&apos;s inventory. Designed for both
        cocktail enthusiasts and newcomers, our app navigates through a
        carefully selected database of about 500 cocktails, making it easy for
        you to discover your next drink without needing a fully stocked bar.
      </p>

      <h3 className="mt-6 text-2xl font-bold">Quick Features</h3>
      <ul>
        <li className="mt-2">
          <strong>Ingredient-Based Searches:</strong> Input your ingredients,
          and we&apos;ll find matching cocktail recipes from our curated
          database.
        </li>
        <li className="mt-2">
          <strong>Explore Ingredients and Cocktails:</strong> Dive into
          individual pages for each ingredient and cocktail. Ingredient pages
          feature a carousel showcasing all cocktails that include the specified
          ingredient, enhancing discovery and exploration.
        </li>
        <li className="mt-2">
          <strong>Favorites:</strong> Save recipes you love for quick access
          later.
        </li>
        {/* TODO */}
        {/* <li>
          <strong>Community Ratings:</strong> See top picks from our users and
          rate your own favorites.
        </li> */}
      </ul>

      <h3 className="mt-8 text-2xl font-bold">The idea behind Spirit Search</h3>
      <p className="mt-2">
        <strong>Project Background:</strong> As a demonstration of modern web
        development skills, including React, Next.js, and API integration,
        SpiritSearch aims to create an interactive, user-friendly experience.
        This project highlights the potential for combining a sleek design with
        functional, data-driven features.
      </p>

      <p className="mt-2">
        <strong>Join the SpiritSearch Experience:</strong> Engage with
        SpiritSearch and contribute your feedback to help it evolve.
      </p>
    </main>
  );
}
