import Section from "../section/Section";

import "../../../sass/main.scss";

function Card(props) {
  return (
    <div className={`inner-container ${props?.containerClass}`}>
      <div>
        <h1 className="title">{props.title}</h1>
        {props.resultClass && (
          <div className={props?.resultClass}>{props?.resultText}</div>
        )}
        {props?.resultObject && (
          <div className="area">
            {Object.entries(props?.resultObject).map((sectionTitle, b) => {
              let comp = "";

              Object.entries(sectionTitle).map((sectionValue, v) => {
                comp = (
                  <Section
                    key={Math.trunc(Math.random() * 1000).toString()}
                    sectionTitle={sectionTitle[0]}
                    sectionValue={sectionValue[1]}
                  ></Section>
                );
                return comp;
              });
              return comp;
            })}
          </div>
        )}
      </div>
      {props.children}
    </div>
  );
}

export default Card;
