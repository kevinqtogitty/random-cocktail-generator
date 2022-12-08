import axios from 'axios';
import { useEffect, useState } from 'react';
import CocktailName from './components/CocktailName';
import Instructions from './components/Instructions';
import RecipeAndInstructions from './components/Recipe';
import TipDialog from './components/TipDialog';
import './index.css';
import { DrinkData, getRandomCocktail } from './requests/requests';

function App() {
  const [randomCocktail, setRandomCocktail] = useState<DrinkData>();

  useEffect(() => {
    document.addEventListener('keydown', fetchNewDrinkOnKeyPress);
    return () =>
      document.removeEventListener('keydown', fetchNewDrinkOnKeyPress);
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getRandomCocktail();
      setRandomCocktail(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchNewDrinkOnKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') return fetchData();
  };

  return (
    <div className="mainContainer">
      <CocktailName randomCocktail={randomCocktail!} />
      <RecipeAndInstructions drinkData={randomCocktail?.ingredients} />
      <Instructions instructions={randomCocktail?.instructions} />
      <TipDialog />
    </div>
  );
}

export default App;
