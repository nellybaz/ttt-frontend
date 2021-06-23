import Button from "../Button";

export default function Modal(props) {

  return (
    <div
      style={{
        width: "400px",
        height: "200px",
        position: "absolute",
        left: "40vw",
        top: "100px",
        borderRadius: "5px",
        backgroundColor: "white",
      }}
    >
      <h4>{props.value}</h4>
      <Button label="OK" onClick={props.onClick} />
    </div>
  );
}