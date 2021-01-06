import React from 'react'

// Common structs for posts (whitepaper, blog)

export interface ImageMeta {
  url: string
  width: number
  height: number
}

export interface PostContent {
  title: string
  content: string

  summary?: string
  shortTitle?: string
  author?: string
  date?: string
  image?: ImageMeta
  donation?: boolean
}

export interface BlogPostContent {
  title: string
  content: string | React.FunctionComponent
  author: string
  date: string
  image?: ImageMeta
  summary: string
}

export type PostMap = { [key: string]: PostContent }
export type BlogPostMap = { [key: string]: BlogPostContent }
