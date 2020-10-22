// Common structs for posts (whitepaper, blog)

export interface PostContent {
  title: string
  shortTitle?: string
  content: string
}

export type PostMap = { [key: string]: PostContent }
