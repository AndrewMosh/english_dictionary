import React, { useState } from "react";
import { observer } from "mobx-react";
import inputStore from "../../store/Inputstore";
import { ApiResponse } from "../../Components/types/types";
// Интерфейс для данных, полученных от API

const ApiComponent: React.FC = observer(() => {
  const [data, setData] = useState<ApiResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  // Функция для отправки значения в API
  const sendDataToApi = async () => {
    setData(null);
    setError(null);
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
      } else {
        setError(`Could not find the word ${inputValue} `);
      }
    } catch (error) {
      // Обработка ошибок
      setError("Error sending data to API");
      console.error("Error sending data to API:", error);
    }
  };

  return (
    <div>
      <button onClick={sendDataToApi}>Send Data to API</button>
      <h2>Displayed Data</h2>
      {data ? (
        <div>
          <p> {data[0].word}</p>
          {data[0].meanings[0].partOfSpeech}
          {data[0].phonetics[0].text}
          {data[0].phonetics[0].audio ? (
            <figure>
              <figcaption>Pronunciation:</figcaption>
              <audio controls src={data[0].phonetics[0].audio}></audio>
            </figure>
          ) : null}
          <div>
            {data[0].meanings[0].definitions.map((def) => (
              <li>{def.definition}</li>
            ))}
          </div>
          {data[0].meanings[0].definitions[0].antonyms}
          {data[0].meanings[0].definitions[0].example}
          {data[0].meanings[0].definitions[0].synonyms}
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
});

export default ApiComponent;
