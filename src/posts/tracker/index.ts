import { PostMap } from 'posts/post'
import basicUsage from 'posts/tracker/basics'
import householdPod from 'posts/tracker/household-pod'
import quickstart from 'posts/tracker/quickstart'
import faq from 'posts/tracker/tracker-faq'

// Note: the keys in this map are the public URL for the post. Changing them will break links.
export const pages: PostMap = {
  quickstart: quickstart,
  basics: basicUsage,
  faq: faq,
  'household-pod': householdPod,
}
