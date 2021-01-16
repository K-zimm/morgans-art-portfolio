import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

const SingleWork = ({ data }) => {
  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
        <div className='sheet__inner'>
          <Link to='/' className='sheet__back-btn'>
            ← Back
          </Link>
          <h1 className='sheet__title'>{data.datoCmsWork.title}</h1>
          <div className='sheet__gallery'>
            <Img fluid={data.datoCmsWork.coverImage.fluid} />
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default SingleWork;

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      slug
      title
      coverImage {
        url
        fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      price
      productShortDescription
      productDescription
    }
  }
`;
