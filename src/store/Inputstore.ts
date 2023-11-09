import { observable, action, makeObservable } from "mobx";

class InputStore {
  inputValue: string = "";

  constructor() {
    makeObservable(this, {
      inputValue: observable,
      setInputValue: action,
    });
  }

  setInputValue(value: string) {
    this.inputValue = value;
  }
}

const inputStore = new InputStore();
export default inputStore;
