import React from "react";
import { Link, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import Layout from "../components/layout";

const SingleCollection = ({ data }) => {
  const products = data.shopifyCollection.products;
  const productCards = products.map((product) => (
    <div key={product.id} className="showcase__item">
      <figure className="card">
        <a
          href={product.onlineStoreUrl}
          target="_blank"
          rel="noreferrer"
          className="card__image"
        >
          <img src={product.images[0].originalSrc} />
        </a>
        <figcaption className="card__caption">
          <h3 className="card__title">
            <a href={product.onlineStoreUrl} target="_blank" rel="noreferrer">
              {product.title}
            </a>
          </h3>
        </figcaption>
      </figure>
    </div>
  ));
  return (
    <Layout>
      <article className={data.shopifyCollection.title}>
        <div className="hero">
          {data.datoCmsCollection.heroImage && (
            <Img
              fluid={data.datoCmsCollection.heroImage.fluid}
              className="hero__img"
            />
          )}

          <div className="hero__content">
            <div
              className="hero__text"
              dangerouslySetInnerHTML={{
                __html: data.datoCmsCollection.heroContent,
              }}
            />
            <Link to={data.datoCmsCollection.ctaLink} className="hero__cta">
              {data.datoCmsCollection.ctaText}
            </Link>
          </div>
        </div>
        <div
          className="collection__content"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsCollection.content,
          }}
        />
        <div className="collection__products">
          <Masonry className="showcase">{productCards}</Masonry>
        </div>
      </article>
    </Layout>
  );
};

export default SingleCollection;

export const query = graphql`
  query CollectionsQuery($CollectionSlug: String!) {
    datoCmsCollection(slug: { eq: $CollectionSlug }) {
      ctaLink
      ctaText
      heroContent
      heroImage {
        fluid(maxWidth: 800, imgixParams: { fm: "png", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      content
      dropTime
    }
    shopifyCollection(handle: { eq: $CollectionSlug }) {
      title
      products {
        id
        availableForSale
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
        onlineStoreUrl
        images {
          originalSrc
        }
      }
    }
  }
`;
