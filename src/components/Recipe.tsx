import React, { useEffect, useState } from 'react';
import { a, config, useTransition } from 'react-spring';
import { Recipe } from '../requests/requests';

interface Props {
  drinkData?: Recipe[];
}

const RecipeAndInstructions: React.FC<Props> = ({ drinkData }) => {
  const transition = useTransition(drinkData, {
    from: {
      opacity: 0,
      transform: 'translateX(-100%)'
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)'
    },
    leave: {
      opacity: 0,
      transform: 'translateX(-100%)'
    },
    exitBeforeEnter: true
  });

  return (
    <div className="recipe">
      {transition((spring, item) => (
        <a.p style={spring} className="ingredient">
          {item?.ingredient} : {item?.measurement}
        </a.p>
      ))}
    </div>
  );
};

export default RecipeAndInstructions;
