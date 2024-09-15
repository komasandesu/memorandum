import React from 'react';

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.innerText = '押しちゃった';
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
