import "../../../sass/main.scss";

function Section(props) {
  return (
    <div className="section-result">
      <div className="subtitle">
        {props.sectionTitle.toString().toUpperCase()}
      </div>
      <div className="result-text">{props.sectionValue}</div>
    </div>
  );
}
export default Section;
