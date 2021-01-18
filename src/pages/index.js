import React from 'react';
import { Link, graphql } from 'gatsby';
import Masonry from 'react-masonry-component';
import Img from 'gatsby-image';
import Layout from '../components/layout';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Masonry className='showcase'>
        {data.allDatoCmsWork.edges.map(({ node: work }) => {
          return (
            <div key={work.id} className='showcase__item'>
              <figure className='card'>
                <Link to={`/works/${work.slug}`} className='card__image'>
                  <Img fluid={work.coverImage.fluid} />
                </Link>
                <figcaption className='card__caption'>
                  <h3 className='card__title'>
                    <Link to={`/works/${work.slug}`}>{work.title}</Link>
                  </h3>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </Masonry>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
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
