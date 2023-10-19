import { useState } from "react";

import "./SearchInput.scss";

function SearchInput(props) {
  const initialInputState = {
    term: "",
    url: "",
    isDisabled: true,

    errorU: false,
    messageU: "",

    errorT: false,
    messageT: "",
  };

  const [userInput, setUserInput] = useState(initialInputState);

  const urlInputHandler = (event) => {
    setUserInput((prev) => {
      return {
        ...prev,
        url: event.target.value.trim(),
      };
    });
  };

  const termInputHandler = (event) => {
    setUserInput((prev) => {
      return {
        ...prev,
        term: event.target.value.trim(),
      };
    });
  };

  const urlErrorHandler = (event) => {
    const value = event.target.value.trim();

    if (value.length > 0 && value.includes("http")) {
      setUserInput((prev) => {
        // "errorInUrl" const is added to make sure errorU and isDisabled both receives the value
        const errorInUrl = false;
        return {
          ...prev,
          errorU: errorInUrl,
          isDisabled: prev.term.length === 0 || prev.errorT || errorInUrl,
          messageU: "",
        };
      });
    } else {
      setUserInput((prev) => {
        return {
          ...prev,
          errorU: true,
          isDisabled: true,
          messageU: '"URL" is considered valid if contains "http"',
        };
      });
    }
  };

  const termErrorHandler = (event) => {
    const value = event.target.value.trim();

    if (value.length > 0 && value.length < 10) {
      setUserInput((prev) => {
        // "errorInUrl" const is added to make sure errorT and isDisabled both receives the value
        const errorInTerm = false;
        return {
          ...prev,
          messageT: "",
          errorT: errorInTerm,
          isDisabled: prev.url.length === 0 || prev.errorU || errorInTerm,
        };
      });
    } else {
      setUserInput((prev) => {
        return {
          ...prev,
          isDisabled: true,
          errorT: true,
          messageT: '"Term" is considered valid if length is between 0, 10',
        };
      });
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
          placeholder="URL"
          value={userInput.url}
          onChange={urlInputHandler}
          onBlur={urlErrorHandler}
          required
        ></input>
        {userInput.errorU && (
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
          placeholder="Search term"
          value={userInput.term}
          onChange={termInputHandler}
          onBlur={termErrorHandler}
          required
        ></input>
        {userInput.errorT && (
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
