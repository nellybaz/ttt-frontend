import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Board from '../../components/Board';

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

describe("Board", () => {
  it("shoud render with the right value", async () => {
    const board = [...Array(9).keys()]
    board[8] = 'X'

    await act(async () => {
      render(<Board board={board} />, container)
    })
    for (let index = 0; index < 8; index++)
      expect(container.querySelector(`[data-testid='cell-${index}']`).textContent).toEqual(index.toString())
    expect(container.querySelector(`[data-testid='cell-8']`).textContent).toEqual('X')
  })
  

  it("shoud render correct size", async () => {
    const board = [...Array(16).keys()]

    await act(async () => {
      render(<Board board={board} />, container)
    })
    for (let index = 0; index < 16; index++)
      expect(container.querySelector(`[data-testid='cell-${index}']`).textContent).toEqual(index.toString())
  })

  it("shoud call the function on user click event", async () => {
    const clickHandler = jest.fn()
    const board = [...Array(9).keys()]

    await act(async () => {
      render(<Board clickHandler={clickHandler} board={board} />, container)
    })

    const cell = container.querySelector("[data-testid='cell-0']")
    expect(cell.textContent).toEqual('0')

    act(() => {
      cell.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    expect(clickHandler).toHaveBeenCalledTimes(1)
  })
})