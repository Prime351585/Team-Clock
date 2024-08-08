// components/ToggleButton.js
import { useState } from 'react';

type ToggleButtonProps = {
  onClick: (isToggled: boolean) => void;
};

const ToggleButton = ({ onClick, ...props }: ToggleButtonProps) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
    onClick(!isToggled); // Call the onClick callback with the new state
  };

  return (
    <button
      className={`w-[29px] h-4  rounded-full transition-colors ${
        isToggled
          ? 'bg-black cursor-pointer hover:bg-gray-800'
          : 'bg-gray-300 cursor-pointer hover:bg-gray-400'
      }`}
      onClick={handleClick}
      {...props}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full mx-auto transition-transform ${
          isToggled ? 'transform translate-x-1.5' : '-translate-x-1.5'
        }`}
      />
    </button>
  );
};

export default ToggleButton;