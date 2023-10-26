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

  const initialModal = {
    showModal: false,
    card: {
      title: "",
      containerClass: "",
      // resultClass is set by Result, when the verification is finished (if)
      resultClass: "",
      resultObject: {
        inputs: {
          url: "",
          term: "",
        },
        details: {
          // placeholder for the error type, as it is generated from error.name or as string from response's status
          "": "",
          hint: "",
        },
      },
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(initialModal);

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
        text: "",
      };
    });

    setModal(initialModal);
    setIsLoading(true);

    let page;
    try {
      page = await fetch(PROXYURL + searchDetails.url);
    } catch (error) {
      const eName = error.name;
      const eMessage = error.message;
      setIsLoading(false);
      setModal({
        showModal: true,
        card: {
          title: "Search failed",
          containerClass: "modal",
          resultObject: {
            inputs: {
              url: searchDetails.url,
              term: searchDetails.term,
            },
            details: {
              [eName]: eMessage,
              hint: "Click anywhere to close the modal",
            },
          },
        },
      });
    }

    if (page?.status !== undefined && page?.status !== 200) {
      setIsLoading(false);
      switch (page?.status) {
        case 404:
          setModal({
            showModal: true,
            card: {
              title: "Page not found!",
              containerClass: "modal",
              resultObject: {
                inputs: {
                  url: searchDetails.url,
                  term: searchDetails.term,
                },
                details: {
                  "Cause of failure": page.statusText,
                  hint: "Click anywhere to close the modal",
                },
              },
            },
          });
          break;
        default:
          setModal({
            showModal: true,
            card: {
              title: "Something went wrong!",
              containerClass: "modal",
              resultObject: {
                inputs: {
                  url: searchDetails.url,
                  term: searchDetails.term,
                },
                details: {
                  "Cause of failure": page.statusText,
                  hint: "Click anywhere to close the modal",
                },
              },
            },
          });
          break;
      }

      resetHandler();
      return;
    }

    if (page?.ok) {
      setIsLoading(false);
      const body = await page.text((r) => r.json());

      if (body.includes(searchDetails.term)) {
        setResult((prev) => {
          const res = {
            ...prev,
          };
          res.text = `"${searchDetails.term}" found on the provided URL`;
          res.isPassed = true;
          return res;
        });
      } else {
        setResult((prev) => {
          const res = {
            ...prev,
          };
          res.text = `Did not find "${searchDetails.term}" on the provided URL!`;
          res.isPassed = false;
          return res;
        });
      }
    }
  };

  const clickHandler = () => {
    setIsLoading(false);
    setModal((p) => {
      return (p.showModal = false);
    });
    setModal(initialModal);
    setResult(initialResultState);
  };

  return (
    <div className="outer-container">
      <SearchData verify={searchHandler}></SearchData>
      {result.text.length > 0 && <Result result={result}></Result>}
      {isLoading && <Overlay onClick={clickHandler} what="spinner" />}
      {modal.showModal && (
        <Overlay onClick={clickHandler} what="modal" data={modal} />
      )}
    </div>
  );
}

export default App;
