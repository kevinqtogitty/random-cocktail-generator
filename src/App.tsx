import axios from 'axios';
import { useEffect, useState } from 'react';
import CocktailHistoryMenu from './components/CocktailHistoryMenu';
import CocktailName from './components/CocktailName';
import Instructions from './components/Instructions';
import RecipeAndInstructions from './components/Recipe';
import TipDialog from './components/TipDialog';
import './index.css';
import { DrinkData, getRandomCocktail } from './requests/requests';

function App() {
  const [activeCocktail, setActiveCocktail] = useState<DrinkData>();
  const [cocktailHistory, setCocktailHistory] = useState<DrinkData[]>([]);
  const [cocktailHistoryMenuActive, setCocktailHistoryMenuActive] =
    useState(false);

  useEffect(() => {
    document.addEventListener('keydown', keyboardEvent);
    return () => document.removeEventListener('keydown', keyboardEvent);
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const data = await getRandomCocktail();
      setActiveCocktail(data);
      setCocktailHistory((state) => [...state, data!]);
    } catch (e) {
      console.log(e);
    }
  };

  const keyboardEvent = (e: KeyboardEvent): Promise<void> | void => {
    if (e.code === 'Enter') {
      return fetchData();
    } else if (e.code === 'Space') {
      return setCocktailHistoryMenuActive((state) => !state);
    }
  };

  return (
    <div className="mainContainer">
      <CocktailName activeCocktail={activeCocktail!} />
      <RecipeAndInstructions drinkData={activeCocktail?.ingredients} />
      <Instructions instructions={activeCocktail?.instructions} />
      <TipDialog />
      <CocktailHistoryMenu
        setActiveCocktail={setActiveCocktail}
        cocktailHistory={cocktailHistory}
        cocktailHistoryMenuActive={cocktailHistoryMenuActive}
        setCocktailHistoryMenuActive={setCocktailHistoryMenuActive}
      />
    </div>
  );
}

export default App;
