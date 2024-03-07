# SpiritSearch

## Introduction

SpiritSearch is a web application designed to help users discover cocktail recipes based on the ingredients they have at home. Built with React and Next.js, it offers a simple yet powerful way to explore a wide range of cocktail options without the need for a fully stocked bar. It uses the [TheCocktailDB](https://www.thecocktaildb.com/) API to provide a comprehensive list of cocktails and ingredients.

## Features

- **Ingredient-Based Search:** Users can enter the ingredients they have and find cocktail recipes that use them.
- **Detailed Pages:** Each ingredient and cocktail has its own page with detailed information and a carousel feature for related cocktails.
- **Favorites System:** Users can save their favorite recipes for easy access later.

## Live Demo

Check out SpiritSearch live: [https://spirit-search.vercel.app/](https://spirit-search.vercel.app/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

npm

```sh
npm install npm@latest -g
```

### Installation

Clone the repo

```sh
git clone https://github.com/pdiegel/Spirit-Search.git
```

Install NPM packages

```sh
npm install
```

Add this Environment Variable to a .env file in the root directory:

```sh
# This is required for development purposes.
NEXT_PUBLIC_NODE_ENV=development
```

### Usage

After installation, you can run SpiritSearch locally:

```sh
npm start
```

Navigate to <http://localhost:3000> to view the app.

### Contributing

Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

### License

Distributed under the MIT License. See LICENSE for more information.

### Contact

Philip Diegel - <philipdiegel@gmail.com>

Project Link: <https://github.com/pdiegel/Spirit-Search>

### Tech Stack

- React
- Next.js
- Vercel
