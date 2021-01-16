import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../../components/layout';

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct;
  return (
    <Layout>
      <div key={product.id} className='showcase__item'>
        <figure className='card'>
          <Img fluid={product.images[0].localFile.childImageSharp.fluid} />
          <figcaption className='card__caption'>
            <h3 className='card__title'>{product.title}</h3>
          </figcaption>
        </figure>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`;

export default ProductPage;
