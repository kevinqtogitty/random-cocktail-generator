import React from 'react';
import { a, useSpring, useTrail } from 'react-spring';
import { DrinkData } from '../requests/requests';

interface Props {
  cocktailHistory: DrinkData[];
  cocktailHistoryMenuActive: boolean;
  setCocktailHistoryMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveCocktail: React.Dispatch<
    React.SetStateAction<DrinkData | undefined>
  >;
}

const CocktailHistoryMenu: React.FC<Props> = ({
  setActiveCocktail,
  cocktailHistory,
  cocktailHistoryMenuActive,
  setCocktailHistoryMenuActive
}) => {
  const overlaySpring = useSpring({
    opacity: cocktailHistoryMenuActive ? 1 : 0,
    transform: cocktailHistoryMenuActive
      ? 'translateY(0%)'
      : 'translateY(-100%)'
  });

  const dialogSpring = useSpring({
    opacity: cocktailHistoryMenuActive ? 1 : 0,
    transform: cocktailHistoryMenuActive ? 'translateY(0%)' : 'translateY(10%)'
  });

  const historyTrail = useTrail(cocktailHistory.length, {
    opacity: cocktailHistoryMenuActive ? 1 : 0,
    transform: cocktailHistoryMenuActive ? 'translateY(0%)' : 'translateY(0%)'
  });

  const handleCloseMenu = () => {
    setCocktailHistoryMenuActive(false);
  };

  return (
    <a.div
      style={overlaySpring}
      className="cocktailMenuOverlay"
      onClick={handleCloseMenu}
    >
      <a.div {...dialogSpring} className="dialog">
        <div className="cocktailMenu">
          {historyTrail.map((spring, i) => (
            <a.span
              className="cocktailName"
              style={spring}
              onClick={() => setActiveCocktail(cocktailHistory[i])}
            >
              {cocktailHistory[i].drinkName}
            </a.span>
          ))}
        </div>
      </a.div>
    </a.div>
  );
};

export default CocktailHistoryMenu;
