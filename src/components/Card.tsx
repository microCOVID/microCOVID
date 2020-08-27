import React from 'react'

export const Card: React.FunctionComponent<{ id?: string; title: string }> = (
  props,
) => (
  <div id={props.id} className={`card mb-3`}>
    <div className="card-body">
      <strong>{props.title}</strong>
      {props.children}
    </div>
  </div>
)

export default Card
