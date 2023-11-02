module.exports = ({ env }) => ({
  plugins: [
    env === 'development'
      ? false
      : require('postcss-preset-env')()
  ],
});