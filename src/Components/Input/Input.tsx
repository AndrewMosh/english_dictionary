import React from "react";
import { observer } from "mobx-react";
import inputStore from "../../store/Inputstore";

const Input: React.FC = observer(() => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputStore.setInputValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={inputStore.inputValue}
      onChange={handleInputChange}
      placeholder="Enter value..."
    />
  );
});

export default Input;
