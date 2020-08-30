import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

function ForSale(props) {
  const slug = props.slug;
  const title = props.productTitle;
  const productImage = props.productImage;
  const productDescription = props.productDescription;
  const price = props.price;

  return (
    <div className='card-forSale'>
      <h2 className='card-forSale__title'>
        The original drawing of {title} is for sale!
      </h2>
      <Img fluid={productImage} className='card-forSale__image' />
      <div className='card-forSale__info'>
        <div
          className='card-forSale__desc'
          dangerouslySetInnerHTML={{
            __html: productDescription,
          }}
        />
        <div className='card-forSale__price'>${price}</div>
        <button
          className='snipcart-add-item card-forSale__btn'
          data-item-id={slug}
          data-item-price={price}
          data-item-name={title}
          data-item-url={`https://earthwalker.design/works/${slug}`}
        >
          Buy Now
        </button>
      </div>
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
            slug={data.datoCmsWork.slug}
            productTitle={data.datoCmsWork.title}
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
      slug
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
