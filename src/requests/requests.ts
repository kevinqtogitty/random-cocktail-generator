import axios from 'axios';

const baseUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic';

export type Recipe = {
  ingredient: string;
  measurement: string;
};

export interface DrinkData {
  drinkName: string;
  ingredients: Recipe[];
  thumbnail: string;
  glass: string;
  instructions: string;
}

const getRandomCocktail = async () => {
  try {
    const { data } = await axios.get(baseUrl);
    const ingredientKeys = Object.keys(data.drinks[0]).filter(
      (key) => key.includes('strIngredient') && data.drinks[0][key] != null
    );
    const measurementKeys = Object.keys(data.drinks[0]).filter(
      (key) => key.includes('strMeasure') && data.drinks[0][key] != null
    );

    let ingredients: Recipe[] = [];

    for (let i = 0; i < ingredientKeys.length; i++) {
      const ingredient = {
        ingredient: data.drinks[0][ingredientKeys[i]],
        measurement: data.drinks[0][measurementKeys[i]]
          ? data.drinks[0][measurementKeys[i]]
          : 'to taste'
      };

      ingredients.push(ingredient);
    }

    const drink: DrinkData = {
      drinkName: data.drinks[0].strDrink,
      glass: data.drinks[0].strGlass,
      thumbnail: data.drinks[0].strDrinkThumb,
      ingredients: ingredients,
      instructions: data.drinks[0].strInstructions
    };
    return drink;
  } catch (e) {
    console.log(e);
  }
};

export { getRandomCocktail };
