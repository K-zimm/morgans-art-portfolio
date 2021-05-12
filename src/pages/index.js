import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Masonry from "react-masonry-component";

const IndexPage = ({ data }) => {
  const [state, setState] = React.useState({});

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

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
        <Img
          fluid={data.datoCmsHome.heroImage2.fluid}
          className="hero__img home-hero__img"
        />
        <div className="hero__content">
          <div
            className="hero__text"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsHome.heroText,
            }}
          />
          <div className="home-hero__buy">
            <div className="home-hero__buy--price">
              $3.89<span>ea</span>
            </div>
            <input
              type="number"
              name="quantity"
              placeholder="QTY"
              onChange={handleChange}
            ></input>
            <a
              href={`${data.datoCmsHome.buttonLink}:${
                state.quantity ? state.quantity : 1
              }`}
              className="hero__cta"
              target="_blank"
              rel="noreferrer"
            >
              {data.datoCmsHome.buttonText}
            </a>
          </div>
        </div>
      </section>
      <div className="featured-art">
        <h2 className="featured-art__title">Featured Art</h2>
        <Masonry className="showcase">
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
        </Masonry>
        <div className="featured-art__link">
          <Link to="/portfolio">View All &gt;</Link>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }, limit: 6) {
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
