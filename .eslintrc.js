module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  plugins: [
  ],
  rules: {
    'no-console': 'off',
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 5
      },      
      'multiline': {
        'max': 1
      }
    }]
  }
}
