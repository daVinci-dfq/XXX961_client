/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended'  // 解决ESLint和Prettier的冲突问题。
  ],
  rules: {
    'vue/multi-word-component-names': [ 'off', { ignores: [] } ]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
