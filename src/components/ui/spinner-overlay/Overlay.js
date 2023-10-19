import "./Overlay.scss";
import Spinner from "./Spinner";

function Overlay(props) {
  return (
    <div className="overlay">
      <Spinner></Spinner>
    </div>
  );
}
export default Overlay;
