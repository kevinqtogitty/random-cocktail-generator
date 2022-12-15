import React from 'react';
import { a } from 'react-spring';

interface Props {
  instructions: string | undefined;
}

const Instructions: React.FC<Props> = ({ instructions }) => {
  return <a.p className="instructions">{instructions}</a.p>;
};

export default Instructions;
