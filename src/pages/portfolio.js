import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import Layout from "../components/layout";

const PortfolioPage = ({ data }) => {
  const [state, setState] = React.useState({
    filteredPosts: data.allDatoCmsWork.edges,
    search: "",
  });

  const allPosts = data.allDatoCmsWork.edges;

  const handleSearchChange = (e) => {
    const query = e.target.value;
    const searchPosts = allPosts.filter((post) => {
      const { title, tags } = post.node;
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags &&
          tags
            .join("")
            .toLowerCase()
            .includes(query.toLowerCase()))
      );
    });
    setState({
      search: query,
      filteredPosts: searchPosts,
    });
  };

  const posts = state.filteredPosts;

  return (
    <Layout>
      <div className="portfolio">
        <div className="portfolio__search">
          <input
            type="text"
            aria-label="Search"
            placeholder="Search art"
            value={state.search}
            onChange={handleSearchChange}
            className="portfolio__search--input"
          />
        </div>
        <Masonry className="showcase">
          {posts.map(({ node: work }) => {
            return (
              <div key={work.id} className="showcase__item">
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
      </div>
    </Layout>
  );
};

export default PortfolioPage;

export const query = graphql`
  query PortfolioQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          color
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
