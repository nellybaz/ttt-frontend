import RadioButton from '../RadioButton';
import Button from "../Button"

export function StageThree(props){
  return (<div> <h4>Do you wanna play first?</h4> <RadioButton options={props.options} name='stageThree' onChange={props.inputHandler} /> <Button label='Next' onClick={props.buttonClickHandler} /></div>)
}