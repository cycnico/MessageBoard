module.exports = {
  "extends": 'airbnb',
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    'react',
    'jsx-a11y',
    'import',
  ],
  "rules": {
    'no-console': 0,
    'no-else-return': 0,
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx"] }],
  },
};
