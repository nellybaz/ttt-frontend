import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import RadioButton from "../../components/RadioButton/"

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

describe("RadioButton", () => {
  it("shoud render with the right props", async () => {
    const options = [
      {
        id: 1,
        label: 'one',
        value: '1'
      },
      {
        id: 2,
        label: 'two',
        value: '2'
      }
    ]
    await act(async () => {
      render(<RadioButton options={options} />, container)
    })

    const radioButton = container.querySelector(`[data-testid='radio-button']`)
    expect(container.querySelector(`[data-testid='options-1']`).value).toEqual(options[0]['value'].toString())
    expect(container.querySelector(`[data-testid='options-2']`).value).toEqual(options[1]['value'].toString())
    expect(container.querySelector(`[data-testid='options-2-label']`).textContent).toEqual(options[1]['label'].toString())

  })

  it("shoud call function on change", async () => {
    const options = [
      {
        id: 1,
        label: 'one',
        value: 'one'
      },
      {
        id: 2,
        label: 'two',
        value: 'two'
      }
    ]

    const onChange = jest.fn()

    await act(async () => {
      render(<RadioButton options={options} onChange={onChange}/>, container)
    })

    const radioButton = container.querySelector(`[data-testid='options-1']`)
    act(() => {
      radioButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(onChange).toBeCalled()

  })
})