module.exports = {
  babel: {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-react', { runtime: 'automatic' }]
    ],
    plugins: [
      ["@locator/babel-jsx/dist", {
        env: "development"
      }]
    ],
    loaderOptions: {
      ignore: [],
    },
  }
};