import { useState } from "react";

import "../../sass/main.scss";

function SearchInput(props) {
  const initialInputState = {
    term: "",
    url: "",
    isDisabled: true,

    isUrlValid: false,
    messageU: "",

    isTermValid: false,
    messageT: "",
  };

  const [userInput, setUserInput] = useState(initialInputState);

  const urlInputHandler = (event) => {
    const urlValidator = (url) => {
      return {
        cleanedUrlInput: url.trim(),
        isUrlValid: url?.includes("http"),
      };
    };

    const validatedUrlObj = urlValidator(event.target.value);

    setUserInput((prev) => {
      return {
        ...prev,
        url: validatedUrlObj.cleanedUrlInput,
        isUrlValid: validatedUrlObj.isUrlValid,
        isDisabled: !(validatedUrlObj.isUrlValid && prev.isTermValid),
      };
    });
  };

  const termInputHandler = (event) => {
    const termValidator = (term) => {
      return {
        cleanedTermInput: term.trim(),
        isTermValid: term?.length > 0 && term?.length < 11,
      };
    };
    setUserInput((prev) => {
      const termValidityObj = termValidator(event.target.value);
      return {
        ...prev,
        term: termValidityObj.cleanedTermInput,
        isTermValid: termValidityObj.isTermValid,
        isDisabled: !(termValidityObj.isTermValid && prev.isUrlValid),
      };
    });
  };

  const errorHandler = (event) => {
    if (event.target.name === "url") {
      if (!userInput.isUrlValid) {
        setUserInput((prev) => {
          return {
            ...prev,
            messageU: '"URL" is considered valid if contains "http"',
          };
        });
      }
    }
    if (event.target.name === "term") {
      if (!userInput.isTermValid) {
        setUserInput((prev) => {
          return {
            ...prev,
            messageT: '"Term" is considered valid if length is between 0, 10',
          };
        });
      }
    }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    props.dataHandler(userInput);
    setUserInput(initialInputState);
  };

  return (
    <form className="area">
      <div className="section">
        <label htmlFor="urlInput" className="subtitle">
          URL
        </label>
        <input
          type="text"
          id="urlInput"
          name="url"
          placeholder="URL"
          value={userInput.url}
          onChange={urlInputHandler}
          onBlur={errorHandler}
        ></input>
        {!userInput.isUrlValid && (
          <label className="errorLabel">{userInput.messageU}</label>
        )}
      </div>
      <div className="section">
        <label htmlFor="termInput" className="subtitle">
          Search term
        </label>
        <input
          type="text"
          id="termInput"
          name="term"
          placeholder="Search term"
          value={userInput.term}
          onChange={termInputHandler}
          onBlur={errorHandler}
        ></input>
        {!userInput.isTermValid && (
          <label className="errorLabel">{userInput.messageT}</label>
        )}
      </div>
      <button
        disabled={userInput.isDisabled}
        type="button"
        onClick={clickHandler}
        className="button"
      >
        VERIFY
      </button>
    </form>
  );
}
export default SearchInput;
