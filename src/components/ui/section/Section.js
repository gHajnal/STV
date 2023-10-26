import "../../../sass/main.scss";

function Section(props) {
  return (
    <div className={
      props.classModifier ? "section-result" + props.classModifier : "section-result"
    }>
      <div
        className={
          props.classModifier ? "subtitle" + props.classModifier : "subtitle"
        }
      >
        {props.sectionTitle.toString()}
      </div>
      <div
        className={
          props.classModifier
            ? "result-text" + props.classModifier
            : "result-text"
        }
      >
        {props.sectionValue}
      </div>
    </div>
  );
}
export default Section;
