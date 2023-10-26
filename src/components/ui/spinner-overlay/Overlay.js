import Spinner from "./Spinner";
import Card from "../card/Card";

import "./Overlay.scss";

function Overlay(props) {
  let spinner;
  let modal;

  const handleClick = () => {
    props.onClick();
  };

  if (props.what === "spinner") {
    spinner = (
      <div onClick={handleClick} className="overlay">
        <Spinner></Spinner>
      </div>
    );
  }

  if (props.what === "modal") {
    modal = (
      <div onClick={handleClick} className="overlay">
        <Card
          title={props.data.card.title}
          containerClass={props.data.card.containerClass}
          resultObject={props.data.card.resultObject}
          resultText={props.data.card.text}
          cardType="modal"
        />
      </div>
    );
  }
  return props.what === "modal" ? modal : spinner;
}
export default Overlay;
