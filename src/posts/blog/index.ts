import uxredesign from 'posts/blog/1-ux-redesign/ux-redesign'
import thanksgiving from 'posts/blog/2-thanksgiving/thanksgiving'
import hepafilters from 'posts/blog/3-hepa-filters/hepa-filters'
import negativeTests from 'posts/blog/4-negative-tests/negativeTests'
import { BlogPostMap } from 'posts/post'

// Note: the keys in this map are the public URL for the post. Changing them will break links.
export const pages: BlogPostMap = {
  negativeTests,
  hepafilters,
  thanksgiving,
  uxredesign,
}
