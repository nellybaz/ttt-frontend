export default function RadioButton(props) {
  return (<div data-testid='radio-button'>
    {
      props.options.map((item, _) => (<div key={item.label} >
        <input onChange={props.onChange} name={props.name} data-testid={`options-${item.id}`} type='radio' value={item.value} />
        <label data-testid={`options-${item.id}-label`}>{item.label}</label>
      </div>))
    }
  </div>)
}