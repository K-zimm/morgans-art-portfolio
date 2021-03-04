import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <section
        className="home-hero"
        style={{
          //backgroundImage: `url(${data.datoCmsHome.heroBackground.fluid.src})`,
        }}
      >
        {/* <Img
          fluid={data.datoCmsHome.heroImage1.fluid}
          className="home-hero__title"
        /> */}
        <div className="home-hero__content">
          <div
            className="home-hero__text"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsHome.heroText,
            }}
          />
          {/* <a href={data.datoCmsHome.buttonLink} className="home-hero__cta">
            {data.datoCmsHome.buttonText}
          </a> */}
        </div>
        <Img
          fluid={data.datoCmsHome.heroImage2.fluid}
          className="home-hero__img"
        />        
      </section>
      <div className="featured-art">
        <h2 className='featured-art__title'>Featured Art</h2>
        <div className='featured-art__link'><Link to='/portfolio'>View All &gt;</Link></div>
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
