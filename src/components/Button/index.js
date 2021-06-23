export default function Button(props){
  return <button data-testid='button' onClick={props.onClick}>{props.label}</button>
}