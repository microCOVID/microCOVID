import React from 'react'

export const Card: React.FunctionComponent<{ id?: string; title: string }> = (
  props,
) => (
  <div id={props.id} className={`card mb-3`}>
    <div className="card-header">{props.title}</div>
    <div className="card-body">{props.children}</div>
  </div>
)
