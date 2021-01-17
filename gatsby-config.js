require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Earthwalker Design`,
    description: `Portfolio and online store containing artwork, products, and other creative works by Morgan Zimmer.`,
    author: `Morgan Zimmer`,
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
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-W7DR82N',
      },
    },
  ],
};
