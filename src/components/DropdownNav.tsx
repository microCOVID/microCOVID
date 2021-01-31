import React from 'react'
import { NavDropdown } from 'react-bootstrap'

import { PostMap } from 'posts/post'

export const DropdownNav: React.FunctionComponent<{
  title: string
  baseNavPath: string
  posts: PostMap
  enableAll: boolean
  tableOfContentsPageTitle?: string
  enableIndexNumbers?: boolean
}> = ({
  title,
  baseNavPath,
  posts,
  enableAll,
  tableOfContentsPageTitle = 'Table of Contents',
  enableIndexNumbers = false,
}) => {
  return (
    <NavDropdown title={title} id="basic-nav-dropdown">
      <NavDropdown.Item href={baseNavPath}>
        {tableOfContentsPageTitle}
      </NavDropdown.Item>
      {enableAll ? (
        <NavDropdown.Item href={`${baseNavPath}/all`}>
          All In One Page
        </NavDropdown.Item>
      ) : null}
      {Object.keys(posts).map((pageId, pageIndex) => (
        <NavDropdown.Item href={`${baseNavPath}/${pageId}`} key={pageIndex}>
          {enableIndexNumbers && `${pageIndex + 1}. `}
          {posts[pageId].shortTitle}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  )
}
