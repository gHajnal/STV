import Section from "../section/Section";

import "../../../sass/main.scss";

function Card(props) {
  const defaultCard = (
    <div className={`inner-container ${props?.containerClass}`}>
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
      {props.children}
    </div>
  );

  let modalCard;
  if (props.cardType === "modal") {
    modalCard = (
      <div className={`inner-container ${props?.containerClass}`}>
        <h1 className="title">{props.title}</h1>
        <div className="area">
          {props?.resultObject &&
            props?.containerClass === "modal" &&
            Object.entries(props?.resultObject?.inputs).map(
              (sectionTitle, b) => {
                let comp = "";
                Object.entries(sectionTitle).map((sectionValue, v) => {
                  comp = (
                    <Section
                      classModifier="-modal"
                      key={Math.trunc(Math.random() * 1000).toString()}
                      sectionTitle={sectionTitle[0]}
                      sectionValue={sectionValue[1]}
                    ></Section>
                  );
                  return comp;
                });
                return comp;
              }
            )}
        </div>
        {props?.resultObject && (
          <div className="area">
            {Object.entries(props?.resultObject?.details).map(
              (sectionTitle, b) => {
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
              }
            )}
          </div>
        )}
        {props.children}
      </div>
    );
  }

  return props.cardType === "modal" ? modalCard : defaultCard;
}

export default Card;
