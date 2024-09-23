const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const withImages = require("next-images");

module.exports = withImages({
  staticPageGenerationTimeout: 1000,
  output: "standalone",
  images: { unoptimized: true },
  trailingSlash: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: {
          test: `test@${process.env.NEXT_PUBLIC_APP_HOME}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        exposes: {
          "./test": "./src/components/test/test",
        },
        filename: "static/chunks/remoteEntry.js",
      })
    );

    config.module.rules.push({
      test: /\.(ts)x?$/, // Just `tsx?` file only
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/:slug(.*xml)",
        destination: `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/assets/sitemap/:slug`,
      },
    ];
  },
});
