import React, { useState } from "react";
import { observer } from "mobx-react";
import inputStore from "../../store/Inputstore";
import { ApiResponse } from "../../Components/types/types";
import styles from "./ApiComponent.module.css";
import Input from "../Input/Input";
import logo from "../../assets/logo.png";
import { BounceLoader } from "react-spinners";

const ApiComponent: React.FC = observer(() => {
  const [data, setData] = useState<ApiResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  // Функция для отправки значения в API
  const sendDataToApi = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setData(null);
    setError(null);
    if (!inputStore.inputValue) {
      setIsLoading(false);
      return;
    }
    try {
      const inputValue = inputStore.inputValue;
      const response = await fetch(`${apiUrl}${inputValue}`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData: ApiResponse[] = await response.json(); // Используем тип ApiResponse
        // Действия с данными, полученными от API
        setData(responseData);
        console.log(data);
        inputStore.setInputValue("");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(`Could not find the word ${inputValue} `);
        inputStore.setInputValue("");
      }
    } catch (error) {
      // Обработка ошибок
      setError("Error sending data to API");
      console.error("Error sending data to API:", error);
      inputStore.setInputValue("");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <BounceLoader color="#3661d7" />
      ) : (
        <div>
          <div className={styles.logo}>
            <img width={data ? 100 : 300} src={logo} alt="logo" />
          </div>
          <form className={styles.form} onSubmit={sendDataToApi}>
            <Input />
            <button className={styles.button} onClick={sendDataToApi}>
              Find
            </button>
          </form>
          {data ? (
            <div className={styles.info}>
              <div className={styles.title}>
                <div className={styles.word}>{data[0].word}</div>{" "}
                <div className={styles.pos}>
                  {data[0].meanings[0].partOfSpeech}
                </div>
                <div className={styles.phonetic}>
                  {data[0].phonetics[0].text}
                </div>
                <div>
                  {data[0].phonetics[0].audio ? (
                    <audio controls src={data[0].phonetics[0].audio}></audio>
                  ) : null}
                </div>
              </div>

              <ol>
                {data[0].meanings[0].definitions.map((def) => (
                  <li>{def.definition}</li>
                ))}
              </ol>
              {data[0].meanings[0].definitions[0].example?.length ? (
                <div className={styles.antonyms + " " + styles.orange}>
                  <div className={styles.example}>Example:</div>
                  <div> {data[0].meanings[0].definitions[0].example}</div>
                </div>
              ) : null}
              {data[0].meanings[0].definitions[0].antonyms?.length ? (
                <div className={styles.antonyms + " " + styles.red}>
                  <div className={styles.example}>Antonyms:</div>
                  <div> {data[0].meanings[0].definitions[0].antonyms}</div>
                </div>
              ) : null}

              {data[0].meanings[0].definitions[0].synonyms?.length ? (
                <div className={styles.antonyms + " " + styles.green}>
                  <div className={styles.example}>Synonyms:</div>
                  <div>
                    {data[0].meanings[0].definitions[0].synonyms.join(", ")}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p className={styles.error}>{error}</p>
          )}
        </div>
      )}
    </>
  );
});

export default ApiComponent;
