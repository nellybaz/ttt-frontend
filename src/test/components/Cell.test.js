import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Cell from '../../components/Cell';

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

describe("Cell", () => {
  it("shoud render with the right value", async () => {
    const value = '0'
    await act(async () => {
      render(<Cell value={value}  index={value}/>, container)
    })
    expect(container.querySelector(`[data-testid='cell-${value}']`).textContent).toEqual(value)
  })

  it("shoud call the function on user click event", async () => {
    const value = '0';
    const clickHandler = jest.fn()

    await act(async () => {
      render(<Cell index={value} value={value} clickHandler={clickHandler}/>, container)
    })

    const cell = container.querySelector(`[data-testid='cell-${value}']`)
    expect(cell.textContent).toEqual(value)

    act(() => {
      cell.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    expect(clickHandler).toHaveBeenCalledTimes(1)
  })
}) 