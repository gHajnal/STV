import React, { useState } from "react";

import Overlay from "./UI/Overlay";
import Result from "./Result";
import SearchData from "./SearchData";

import "./index.scss";

function App() {
  const initialResultState = {
    term: "",
    url: "",
    isPassed: false,
    resultText: "",
  };

  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState(initialResultState);

  const resetHandler = () => {
    setResult(initialResultState);
  };

  // PROXYURL is required by  [CORS Anywhere] module
  const PROXYURL = "https://cors-anywhere.herokuapp.com/";

  const verifyText = async (userInput) => {
    setResult((prev) => {
      const res = {
        ...prev,
      };

      res.url = userInput.url;
      res.term = userInput.term;

      return res;
    });

    setIsLoading(true);
    const page = await fetch(PROXYURL + userInput.url);

    if (page.ok) {
      setIsLoading(false);
      const body = await page.text((r) => r.json());

      if (body.includes(userInput.term)) {
        setResult((prev) => {
          const res = {
            ...prev,
          };
          res.resultText = `"${userInput.term}" found on ${userInput.url}`;
          res.isPassed = true;
          return res;
        });
      } else {
        setResult((prev) => {
          const res = {
            ...prev,
          };
          res.resultText = `Did not find "${userInput.term}" on ${userInput.url}!`;
          res.isPassed = false;
          return res;
        });
      }
    }

    if (page.status !== 200) {
      setIsLoading(false);
      alert("Most possible error: URL DOES NOT EXIST!");
      resetHandler();
      return;
    }
  };

  return (
    <>
      <SearchData verify={verifyText} reset={resetHandler}></SearchData>
      {result.resultText.length > 0 && (
        <Result result={result} reset={resetHandler}></Result>
      )}
      {isLoading && <Overlay />}
    </>
  );
}

export default App;
