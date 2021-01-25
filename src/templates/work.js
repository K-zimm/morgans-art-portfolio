import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

const SingleWork = ({ data }) => {
  const tags = data.datoCmsWork.tags;

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
          <h2 className="sheet__title--2">Tags</h2>
          <div className="sheet__tags">
            {tags.map((tag) => {
              const tagLowercase = tag.toLowerCase();
              return (
                <div key={tag} className="sheet__tags--tag">
                  <Link to={`/tags/${tagLowercase}`}>
                    {tag}
                  </Link>
                </div>
              )              
            })}
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
      tags
      coverImage {
        url
        fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
    }
  }
`;
