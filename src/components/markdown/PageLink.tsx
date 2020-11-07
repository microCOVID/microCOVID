import React from 'react'
import { Link } from 'react-router-dom'

export const PageLink: React.FunctionComponent<{
  toId: string
  className?: string
  anchor?: boolean
}> = (props) => {
  if (props.anchor) {
    return (
      <a href={`#${props.toId}`} className={props.className}>
        {props.children}
      </a>
    )
  } else {
    return (
      <Link to={props.toId} className={props.className}>
        {props.children}
      </Link>
    )
  }
}
