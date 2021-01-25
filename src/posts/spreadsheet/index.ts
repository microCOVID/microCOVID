import { PostMap } from 'posts/post'
import basicUsage from 'posts/spreadsheet/basics'
import householdPod from 'posts/spreadsheet/household-pod'
import quickstart from 'posts/spreadsheet/quickstart'
import faq from 'posts/spreadsheet/spreadsheet-faq'

// Note: the keys in this map are the public URL for the post. Changing them will break links.
export const pages: PostMap = {
  quickstart: quickstart,
  basics: basicUsage,
  faq: faq,
  'household-pod': householdPod,
}
