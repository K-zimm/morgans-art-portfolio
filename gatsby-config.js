require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Earthwalker Design`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        // The domain name of your Shopify shop.
        shopName: `earthwalker-design.myshopify.com`,
        // The storefront access token
        accessToken: `df15017338b2e5ba08d52a9dcdca4ea8`,
      },
    },
    {
      resolve: "gatsby-plugin-snipcartv3",
      options: {
        apiKey: process.env.GATSBY_SNIPCART_APIKEY,
        autopop: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-W7DR82N",
      },
    },
  ],
};
