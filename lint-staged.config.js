module.exports = {
  '*.{ts,js}': ['eslint --fix', 'git add'],
  '*.md': ['prettier --write', 'git add'],
}
