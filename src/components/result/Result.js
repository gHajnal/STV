import Card from "../ui/card/Card";

import "../../sass/main.scss";

function Result(props) {
  const title = `Result - ${props.result.isPassed ? "VERIFIED" : "FAILED"}`;
  const containerClass = `${props.result.isPassed ? "passed" : "failed"}`;
  const resultClass = `result${props.result.isPassed ? "-passed" : "-failed"}`;
  const resultText = props.result.text;

  const resultObject = {
    term: props.result.term,
    url: props.result.url,
  };

  return (
    <Card
      title={title}
      containerClass={containerClass}
      resultClass={resultClass}
      resultObject={resultObject}
      resultText={resultText}
    />
  );
}
export default Result;
