import { PostMap } from 'posts/post'
import quickstart from 'posts/spreadsheet/quickstart'
import faq from 'posts/spreadsheet/spreadsheet-faq'
import basicUsage from 'posts/spreadsheet/basic-usage'

// Note: the keys in this map are the public URL for the post. Changing them will break links.
export const pages: PostMap = {
  quickstart: quickstart,
  'basic-usage': basicUsage,
  faq: faq,
}
