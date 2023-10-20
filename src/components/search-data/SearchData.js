import SearchInput from "../search-input/SearchInput";

import "../../sass/main.scss";

function SearchData(props) {
  const dataHandler = (userInput) => {
    if (userInput.url !== "") {
      const data = {
        url: userInput.url,
        term: userInput.term,
      };
      props.verify(data);
    }
  };

  return (
    <div className="inner-container">
      <div>
        <h1 className="title">Search Term Verifier</h1>
        <SearchInput dataHandler={dataHandler}></SearchInput>
      </div>
    </div>
  );
}
export default SearchData;
