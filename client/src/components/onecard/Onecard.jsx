import React, { useEffect } from 'react'

export default function Onecard(props) {
  return (
    <div>{props.value} :- {props.prize*props.milkperday}</div>
  )
}
