import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <section
        className="hero"
        style={
          {
            //backgroundImage: `url(${data.datoCmsHome.heroBackground.fluid.src})`,
          }
        }
      >
        <Img fluid={data.datoCmsHome.heroImage2.fluid} className="hero__img" />
        <div className="hero__content">
          <div
            className="hero__text"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsHome.heroText,
            }}
          />
          <a href={data.datoCmsHome.buttonLink} className="hero__cta">
            {data.datoCmsHome.buttonText}
          </a>
        </div>
      </section>
      <section
        className="hero"
        style={
          {
            //backgroundImage: `url(${data.datoCmsHome.heroBackground.fluid.src})`,
          }
        }
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0521/0429/8677/products/GrlPwr_1024x1024.png?v=1615091654"
          className="hero__img"
        />
        <div className="hero__content">
          <div className="hero__text">
            <h2>Women's History Month Stickers Available!</h2>
            <p>Help us raise money for women in need this month.</p>
          </div>
          <Link to="/collections/womens-history-month" className="hero__cta">
            Learn More
          </Link>
        </div>
      </section>
      <div className="featured-art">
        <h2 className="featured-art__title">Featured Art</h2>
        <div className="featured-art__link">
          <Link to="/portfolio">View All &gt;</Link>
        </div>
        {data.allDatoCmsWork.edges.map(({ node: work }) => {
          return (
            <div key={work.id} className="featured-art__item">
              <figure className="card">
                <Link to={`/works/${work.slug}`} className="card__image">
                  <Img fluid={work.coverImage.fluid} />
                </Link>
                <figcaption className="card__caption">
                  <h3 className="card__title">
                    <Link to={`/works/${work.slug}`}>{work.title}</Link>
                  </h3>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }, limit: 3) {
      edges {
        node {
          id
          title
          slug
          coverImage {
            url
            fluid(maxWidth: 600, imgixParams: { fm: "png", auto: "compress" }) {
              ...GatsbyDatoCmsFluid_noBase64
            }
          }
        }
      }
    }
    datoCmsHome {
      buttonText
      buttonLink
      heroImage1 {
        fluid(maxWidth: 500, imgixParams: { fm: "png", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      heroImage2 {
        fluid(maxWidth: 500, imgixParams: { fm: "png", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      heroBackground {
        fluid {
          ...GatsbyDatoCmsFluid_noBase64
          src
        }
      }
      heroText
    }
  }
`;
