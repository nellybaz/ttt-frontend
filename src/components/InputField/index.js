import './index.css'

export default function InputField(props) {

  return (<div>
    <label htmlFor='input-field' data-testid='input-label'>{props.label}</label> <br />
    <input data-testid='input' min={1} max={5} id='input-field' type={props.type} onChange={props.onChange} placeholder={props.placeholder}></input><br />
  </div>)
}