import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

function ForSale(props) {
  const productImage = props.productImage;
  const productDescription = props.productDescription;
  const price = props.price;

  return (
    <div>
      <h2>This Drawing Is For Sale!</h2>
      <Img fluid={productImage} />
      <div
        dangerouslySetInnerHTML={{
          __html: productDescription,
        }}
      />
      <div>${price}</div>
    </div>
  );
}

const SingleWork = ({ data }) => {
  const isForSale = data.datoCmsWork.forSale;
  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
        <div className='sheet__inner'>
          <Link to='/' className='sheet__back-btn'>
            ← Back
          </Link>
          <h1 className='sheet__title'>{data.datoCmsWork.title}</h1>
          <p className='sheet__lead'>{data.datoCmsWork.excerpt}</p>
          <div className='sheet__gallery'>
            <Img fluid={data.datoCmsWork.coverImage.fluid} />
          </div>
        </div>
        {isForSale && (
          <ForSale
            productImage={data.datoCmsWork.coverImage.fluid}
            productDescription={data.datoCmsWork.productDescription}
            price={data.datoCmsWork.price}
          />
        )}
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
      title
      excerpt
      coverImage {
        url
        fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      forSale
      productImage {
        url
        fluid(maxWidth: 500, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      price
      productDescription
    }
  }
`;
