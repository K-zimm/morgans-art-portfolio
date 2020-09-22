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
          const forSale = work.forSale;

          return (
            <div key={work.id} className='showcase__item'>
              <figure className='card'>
                {forSale && (
                  <button
                    className='snipcart-add-item card__banner'
                    data-item-id={work.slug}
                    data-item-image={work.coverImage.url}
                    data-item-price={work.price}
                    data-item-name={work.title}
                    data-item-description={work.productShortDescription}
                    data-item-url={`https://earthwalker.design/works/${work.slug}`}
                  >
                    Buy Now
                  </button>
                )}
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
          forSale
          price
          productShortDescription
        }
      }
    }
  }
`;
