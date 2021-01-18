const _ = require('lodash');
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allDatoCmsWork {
        edges {
          node {
            slug
            tags
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const works = result.data.allDatoCmsWork.edges;

    works.forEach((edge) => {
      createPage({
        path: `works/${edge.node.slug}`,
        tags: edge.node.tags,
        component: path.resolve(`./src/templates/work.js`),
        context: {
          slug: edge.node.slug,
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    works.forEach((edge) => {
      if (_.get(edge, `node.tags`)) {
        tags = tags.concat(edge.node.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`./src/templates/tags.js`),
        context: {
          tag,
        },
      });
    });
  });
};
