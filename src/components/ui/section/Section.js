import "./Section.scss";

function Section(props) {
  // toString() is required in order to present boolean values
  const value = props.sectionValue.toString();

  return (
    <div className="section-result">
      <span className="subtitle">
        {props.sectionTitle.toString().toUpperCase()}
      </span>
      <span className="result-text">{value}</span>
    </div>
  );
}
export default Section;
