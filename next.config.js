const path = require('path')

module.exports = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    domains: ["www.github.com", "api.hausey.net"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@import "src/styles/_variables.scss"; @import "src/styles/_mixins.scss";`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  staticPageGenerationTimeout: 700,
};
