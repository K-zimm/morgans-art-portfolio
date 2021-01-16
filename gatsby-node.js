const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
        allShopifyProduct {
          edges {
            node {
              handle
            }
          }
        }
      }
    `).then((result) => {
      result.data.allDatoCmsWork.edges.map(({ node: work }) => {
        createPage({
          path: `works/${work.slug}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: work.slug,
          },
        });
      });
      result.data.allShopifyProduct.edges.forEach(({ node }) => {
        createPage({
          path: `/product/${node.handle}/`,
          component: path.resolve(`./src/templates/products/index.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            handle: node.handle,
          },
        });
      });
      resolve();
    });
  });
};
