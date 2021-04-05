import React from 'react';
import { createBem } from '../utils';

const Button: React.FC = props => {
  const bem = createBem('ligero-button');
  return <div className={bem()}>{props.children}</div>;
};

export default Button;
