import "../../../sass/main.scss";

function Section(props) {
  return (
    <div className="section-result">
      <span className="subtitle">
        {props.sectionTitle.toString().toUpperCase()}
      </span>
      <span className="result-text">{props.sectionValue}</span>
    </div>
  );
}
export default Section;
