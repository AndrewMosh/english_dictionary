import React from "react";
import { observer } from "mobx-react";
import inputStore from "../../store/Inputstore";
import styles from "./Input.module.css";
const Input: React.FC = observer(() => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputStore.setInputValue(event.target.value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      value={inputStore.inputValue}
      onChange={handleInputChange}
      placeholder="Enter a word in English..."
    />
  );
});

export default Input;
