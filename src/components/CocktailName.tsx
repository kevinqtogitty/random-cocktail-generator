import React from 'react';
import { a, config, useTransition } from 'react-spring';
import { DrinkData } from '../requests/requests';

interface Props {
  randomCocktail: DrinkData;
}

const CocktailName: React.FC<Props> = ({ randomCocktail }) => {
  const transition = useTransition(randomCocktail, {
    from: {
      opacity: 1,
      transformOrigin: 'center',
      transform: 'rotateX(90deg) translateY(50%)'
    },
    enter: {
      opacity: 1,
      transformOrigin: 'center',
      transform: 'rotateX(0deg) translateY(0%)'
    },
    leave: {
      opacity: 0,
      transformOrigin: 'center',
      transform: 'rotateX(90deg) translateY(-100%)'
    },
    config: config.molasses
  });

  return (
    <>
      {transition((spring, item) => (
        <a.h1 style={spring} className="drink">
          {item?.drinkName}
        </a.h1>
      ))}
    </>
  );
};

export default CocktailName;
