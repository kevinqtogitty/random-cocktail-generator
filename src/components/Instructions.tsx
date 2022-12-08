import React from 'react';
import { a } from 'react-spring';

interface Props {
  instructions: string;
}

const Instructions: React.FC<Props> = ({ instructions }) => {
  return <a.p className="instructions">{instructions}</a.p>;
};

export default Instructions;
