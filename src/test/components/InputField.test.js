import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import InputField from '../../components/InputField';

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.append(container)
})

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

describe("InputField", () => {
  it("shoud render input field with the right label", async () => {
    const label = 'Enter board size'
    const placeholder = 'Enter'
    await act(async () => {
      render(<InputField label={label}  placeholder={placeholder}/>, container)
    })

    expect(container.querySelector("[data-testid='input-label']").textContent).toEqual(label)
    expect(container.querySelector("[data-testid='input']").placeholder).toEqual(placeholder)
  })

  xit("calls function on change", async () => {
    const label = 'Enter board size'
    const onChange = jest.fn()
    const placeholder = 'Enter'

    await act(async () => {
      render(<InputField label={label} onChange={onChange} placeholder={placeholder} />, container)
    })

    const input = container.querySelector("[data-testid='input']")
    expect(container.querySelector("[data-testid='input-label']").textContent).toEqual(label)
    expect(input.placeholder).toEqual(placeholder)

    act(() => {
      input.dispatchEvent(new InputEvent("change", { bubbles: true }))
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  }) 

})