import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Button from "../../components/Button/index.js"

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

describe("Button", () => {
  it("shoud render with the right props", async () => {
    const text = 'Click me'
    await act(async () => {
      render(<Button label={text} />, container)
    })
    expect(container.querySelector(`[data-testid='button']`).textContent).toEqual(text)
  })

  it("shoud call function when clicked", async () => {
    const text = 'Click me'
    const onClick = jest.fn()

    await act(async () => {
      render(<Button label={text} onClick={onClick}/>, container)
    })

    const button = container.querySelector(`[data-testid='button']`)

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(button.textContent).toEqual(text)
    expect(onClick).toBeCalled()
  })
})