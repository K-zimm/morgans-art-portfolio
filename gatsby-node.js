const _ = require("lodash");
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
      allDatoCmsCollection {
        edges {
          node {
            slug
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
    const collections = result.data.allDatoCmsCollection.edges;

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

    collections.forEach((edge) => {
      createPage({
        path: `collections/${edge.node.slug}`,
        component: path.resolve(`./src/templates/collections.js`),
        context: {
          CollectionSlug: edge.node.slug,
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    works.forEach((edge) => {
      if (_.get(edge, `node.tags`)) {
        tags = tags.concat(edge.node.tags.split(", "));
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `tags/${_.kebabCase(tag)}/`;
      tagRegex = `/${tag}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`./src/templates/tags.js`),
        context: {
          tagRegex,
          tag,
        },
      });
    });
  });
};
