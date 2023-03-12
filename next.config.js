// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            babel: true,
            titleProp: true,
          },
        },
        {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[hash:8].[ext]',
            limit: 500000,
          },
        },
      ],
    });

    return config;
  },
};
