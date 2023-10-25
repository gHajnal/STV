import Spinner from "./Spinner";
import Card from "../card/Card";

import "./Overlay.scss";

function Overlay(props) {
  let show;
  const handleClick = () => {
    props.onClick();
  };

  if (props.what === "spinner") {
    show = (
      <div onClick={handleClick} className="overlay">
        <Spinner></Spinner>
      </div>
    );
  }

  if (props.what === "modal") {
    show = (
      <div onClick={handleClick} className="overlay">
        <Card
          title={props.data.card.title}
          containerClass={props.data.card.containerClass}
          resultClass={props.data.card.resultClass}
          resultObject={props.data.card.resultObject}
          resultText={props.data.card.text}
        />
      </div>
    );
  }

  return show;
}
export default Overlay;
