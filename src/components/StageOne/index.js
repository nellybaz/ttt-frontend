import InputField from '../InputField/index';
import Button from "../Button"

export function StageOne(props){
  return (<div> <InputField label='Enter the size of the board' type='number' onChange={props.inputHandler} onKeyUp={props.buttonClickHandler} showError={props.showError} /> <Button label='Next' onClick={props.buttonClickHandler} /></div>)
}