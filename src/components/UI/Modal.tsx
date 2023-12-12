import  { Fragment, ReactNode } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
type Props = {
  children: ReactNode;
};

type BackdropProp = {
  onClose: () => void;
  bg?: boolean;
};

const Backdrop = (props: BackdropProp) => {
  return (
    <div
      onClick={props.onClose}
      className={`${classes.backdrop} ${props.bg && classes.bg}`}
    ></div>
  );
};

const ModalOverlay = (props: Props) => {
  return <>{props.children}</>;
};

type ModalProp = {
  onClose: () => void;
  children: ReactNode;
  show: boolean;
  bg?: boolean;
};
const portalDiv = document.getElementById("overlays");

export default function Modal(props: ModalProp) {
  return (
    <Fragment>
      {props.show
        ? ReactDOM.createPortal(
            <Backdrop onClose={props.onClose} bg={props.bg} />,
            portalDiv!
          )
        : null}
      {/* {props.show */}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalDiv!
      )}
      {/* : null} */}
    </Fragment>
  );
}
