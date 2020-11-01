// Common structs for posts (whitepaper, blog)

export interface ImageMeta {
  url: string
  width: number
  height: number
}

export interface PostContent {
  title: string
  shortTitle?: string
  content: string
  author?: string
  date?: string
  image?: ImageMeta
}

export type PostMap = { [key: string]: PostContent }
