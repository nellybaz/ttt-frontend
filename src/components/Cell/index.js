import React from 'react'
import './index.css'

export default function Cell(props){
  return <div className='cell' data-testid={`cell-${props.index}`} onClick={()=>props.clickHandler(props.index)}>{props.value}</div>
}