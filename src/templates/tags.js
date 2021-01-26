import React from 'react';
import { Link, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Masonry from 'react-masonry-component';
import Img from 'gatsby-image';
import Layout from '../components/layout';

class TagRoute extends React.Component {
  render() {
    const works = this.props.data.allDatoCmsWork.edges;
    const workCards = works.map((work) => (
      <div className='showcase__item'>
        <figure className='card'>
          <Link to={`/works/${work.node.slug}`} className='card__image'>
            <Img fluid={work.node.coverImage.fluid} />
          </Link>
          <figcaption className='card__caption'>
            <h3 className='card__title'>
              <Link to={`/works/${work.node.slug}`}>{work.node.title}</Link>
            </h3>
          </figcaption>
        </figure>
      </div>
    ));
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const tagHeader = `Artwork containing ${tag}`;

    return (
      <Layout>
        <div className='tag'>
          <HelmetDatoCms title={`Artwork containing ${tag} | ${title}`} />
          <h1 className='title'>{tagHeader}</h1>
          <Masonry className='showcase'>{workCards}</Masonry>
        </div>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tagRegex: String) {
    site {
      siteMetadata {
        title
      }
    }
    allDatoCmsWork(
      sort: { fields: [position], order: ASC }
      filter: { tags: { regex: $tagRegex } }
    ) {
      edges {
        node {
          id
          title
          slug
          tags
          coverImage {
            url
            fluid(maxWidth: 300, imgixParams: { fm: "png", auto: "compress" }) {
              ...GatsbyDatoCmsFluid_noBase64
            }
          }
        }
      }
    }
  }
`;
