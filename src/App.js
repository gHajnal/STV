import React, { useState } from "react";

import Overlay from "../src/components/ui/spinner-overlay/Overlay";
import Result from "../src/components/result/Result";
import SearchData from "../src/components/search-data/SearchData";

function App() {
  const initialResultState = {
    term: "",
    url: "",
    isPassed: false,
    text: "",
  };

  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState(initialResultState);

  const resetHandler = () => {
    setResult(initialResultState);
  };

  // PROXYURL is required by  [CORS Anywhere] module
  const PROXYURL = "https://cors-anywhere.herokuapp.com/";

  const searchHandler = async (searchDetails) => {
    setResult((prev) => {
      return {
        ...prev,
        url: searchDetails.url,
        term: searchDetails.term,
      };
    });

    setIsLoading(true);

    const page = await fetch(PROXYURL + searchDetails.url);

    if (page.ok) {
      setIsLoading(false);
      const body = await page.text((r) => r.json());

      if (body.includes(searchDetails.term)) {
        setResult((prev) => {
          const res = {
            ...prev,
          };
          res.text = `"${searchDetails.term}" found on ${searchDetails.url}`;
          res.isPassed = true;
          return res;
        });
      } else {
        setResult((prev) => {
          const res = {
            ...prev,
          };
          res.text = `Did not find "${searchDetails.term}" on ${searchDetails.url}!`;
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
    <div className="outer-container">
      <SearchData verify={searchHandler}></SearchData>
      {result.text.length > 0 && <Result result={result}></Result>}
      {isLoading && <Overlay />}
    </div>
  );
}

export default App;
