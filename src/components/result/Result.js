import Card from "../ui/card/Card";

function Result(props) {
  const title = `Result - ${props.result.isPassed ? "PASSED" : "FAILED"}`;
  const containerClass = `${props.result.isPassed ? "passed" : "failed"}`;
  const resultClass = `result${props.result.isPassed ? "-passed" : "-failed"}`;
  const resultText = props.result.resultText;

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
