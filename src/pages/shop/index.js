import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../../components/layout";

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const ShopPage = ({ data }) => {
  return (
    <Layout>
      <div className="shop">
        {data.allShopifyProduct.edges.map(({ node: product }) => {
          const price = formatter.format(product.priceRange.minVariantPrice.amount);
          return (
            <div key={product.id} className="shop__item">
              <div className="product-card">
                <Link
                  to={`/product/${product.handle}`}
                  className="product-card__image"
                >
                  <Img
                    fluid={product.images[0].localFile.childImageSharp.fluid}
                  />
                </Link>
                <Link to={`/product/${product.handle}`} className="product-card__title">
                  <h3>{product.title}</h3>
                </Link>
                <div className="product-card__price">
                  {price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
          priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`;
