import React from 'react';
import { Link, graphql } from 'gatsby';
import Masonry from 'react-masonry-component';
import Img from 'gatsby-image';
import Layout from '../../components/layout';

const ShopPage = ({ data }) => {
  return (
    <Layout>
      <Masonry className='showcase'>
        {data.allShopifyProduct.edges.map(({ node: product }) => {
          return (
            <div key={product.id} className='showcase__item'>
              <figure className='card'>
                <Link to={`/shop`} className='card__image'>
                  <Img
                    fluid={product.images[0].localFile.childImageSharp.fluid}
                  />
                </Link>
                <figcaption className='card__caption'>
                  <h3 className='card__title'>
                    <Link to={`/shop`}>{product.title}</Link>
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

export default ShopPage;

export const query = graphql`
  query ShopQuery {
    allShopifyProduct(sort: { order: ASC }) {
      edges {
        node {
          id
          title
          handle
          images {
            originalSrc
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
