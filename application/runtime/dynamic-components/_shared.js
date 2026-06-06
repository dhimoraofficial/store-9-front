// Shared helper utilities and placeholder data for template components
// Used by the component variation files under templates/*

export const placeholderImage = (w = 800, h = 450, text = 'Placeholder') =>
  `https://via.placeholder.com/${w}x${h}?text=${encodeURIComponent(text)}`;

export const sampleLinks = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];

export const sampleServices = [
  { title: 'Design', desc: 'Clean design systems', icon: '🎨' },
  { title: 'Development', desc: 'Modern web development', icon: '💻' },
  { title: 'Marketing', desc: 'Grow your audience', icon: '📣' },
];

export const sampleTestimonials = [
  { quote: 'Great service — highly recommend.', author: 'Jane Doe', role: 'CEO, Acme' },
  { quote: 'Saved us tons of time.', author: 'John Smith', role: 'CTO, Beta' },
];

export const samplePosts = Array.from({ length: 6 }).map((_, i) => ({
  title: `Sample Post ${i + 1}`,
  excerpt: 'Short excerpt to preview the post content and style.',
  image: placeholderImage(600, 360, `Post ${i + 1}`),
}));

export const samplePortfolio = Array.from({ length: 8 }).map((_, i) => ({
  title: `Project ${i + 1}`,
  image: placeholderImage(640, 420, `Project ${i + 1}`),
  tags: ['Web', 'Design'],
}));

// small utility for safe className merging (very small)
// Utility: simple class name concatenation (removes falsy values)
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

// NavbarSpacer: Use this component to add spacing below fixed/sticky navbars
// Pass the height prop to match your navbar's height
export function NavbarSpacer({ height = 'h-16', className = '' }) {
  return <div className={cx(height, className)} aria-hidden="true" />;
}

export default {};
