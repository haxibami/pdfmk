export const defaultStyle = `/* Template CSS file */

/*
 * Web Fonts
 */

@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');

/*
 * Base colors
 */

:root {
  --foreground: #292433;
  --background: white;
  --black: #1c1921;
  --gray: #edebef;
  --line: #8a829955;
  --link: #4966bb;
}

/*
 * Universal
 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-position: inside;
  line-height: 1.75em;
}

/*
 * Typography & main style
 */

body {
  font-family: Rubik, Noto Sans CJK JP, Helvetica Neue, Helvetica,
    "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji",
    "Segoe UI Symbol", "Android Emoji", EmojiSymbols, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, sans-serif;
  font-size: 1rem;
  color: var(--foreground);
  background: var(--background);
}

/* 
 * Link universal
 */

a {
  color: inherit;
  text-decoration: none;
}

/*
 * Headings
 */

h1 {
  margin: 2rem 0 1rem 0;
  border-bottom: 1px solid var(--line);
  color: var(--black);
}

h2 {
  margin: 2rem 0 1rem 0;
  font-size: 2rem;
  border-bottom: 1px solid var(--line);
  color: var(--black);
}

h3 {
  margin: 1rem 0 0.5rem 0;
  font-size: 1.5rem;
  color: var(--black);
}

h4 {
  margin: 2rem 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--black);
}

h5 {
  color: var(--black);
}

h6 {
  color: var(--black);
}

/*
 * Parapraphs
 */

p {
  margin: 2rem 0;
}

p a {
  color: var(--link);
  text-decoration: underline;
}

/*
 * Lists
 */

li {
  margin: 1rem;
}

li a {
  color: var(--link);
  text-decoration: underline;
}

/*
 * Tables
 */

table {
  table-layout: fixed;
  border-collapse: collapse;
  text-align: center;
  color: var(--black);
}

table th,
table td {
  border: 1px solid var(--line);
  padding: 0.25rem 0.5rem;
}

table th {
  background: var(--gray);
}

/*
 * Inline Code
 */

code {
  background: var(--gray);
  padding: 0.2rem;
  border-radius: 0.2rem;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas,
    monospace;
}

/*
 * Code Blocks
 */

pre[class*="language-"] {
  max-width: 100%;
  margin: 2rem 0;
}

code[class*="language-"] {
  padding: 0;
  white-space: break-spaces;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas,
    monospace;
  font-size: 80%;
}

/*
 * Blockquotes
 */

blockquote {
  color: #8a8299;
  padding: 0 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
}

blockquote::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 0.3rem;
  left: 0;
  background: var(--line);
}

blockquote p {
  margin: 0;
}

/*
 * GFM footnotes
 */

[class="footnotes"] {
  margin-top: 2em;
  border-top: 1px var(--line) solid;
}

[class="footnotes"] li {
  font-size: 0.9rem;
  list-style-position: outside;
}

/*
 * Mermaid diagrams
 */

[class="mermaid"] svg {
  background: var(--background);
  object-fit: cover;
  width: 100%;
  height: 100%;
}

/*
 * KaTeX Math
 */
[class="math-display"] {
  color: var(--black);
}`;
