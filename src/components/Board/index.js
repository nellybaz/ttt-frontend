import Cell from "../Cell"
import './index.css'


export default function Board(props) {
  const getSize = () => Math.sqrt(props.board.length) || 3

  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${getSize()}, 1fr)`
  }
  return (
    <div style={style} data-testid='board'>{
      props.board.map((item, index) =>
        <Cell key={index} index={index} value={item} clickHandler={props.clickHandler} />
      )
    }</div>
  )
}
