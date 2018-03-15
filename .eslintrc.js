// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'eol-last': 0,
    'space-before-function-paren': 0,
    // 可以使用";"号
    "semi": [0],
    // 可以使用未定义的元素
    "no-undef": 0,
    // space-before-function-paren 
    'space-before-function-paren': 0,
    'indent': 0,
    'no-unused-vars': 0,
    'no-trailing-spaces': 0,
    'spaced-comment': 0,
    'quotes': 0,
    'eqeqeq': 0,
    'no-useless-escape': 0,
    'one-var': 0,
    'comma-dangle': 0,
    'padded-blocks': 0,
    'no-shadow-restricted-names': 0
  }
}
