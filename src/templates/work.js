import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

function ForSale(props) {
  const slug = props.slug;
  const title = props.productTitle;
  const productImageUrl = props.productImageUrl;
  const productImageFluid = props.productImageFluid;
  const productShortDescription = props.productShortDescription;
  const productDescription = props.productDescription;
  const price = props.price;

  return (
    <div className='card-forSale'>
      <h2 className='card-forSale__title'>
        Print of {title} available for purchase!
      </h2>
      <Img fluid={productImageFluid} className='card-forSale__image' />
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
          data-item-image={productImageUrl}
          data-item-price={price}
          data-item-name={title}
          data-item-description={productShortDescription}
          data-item-url={`https://earthwalker.design/works/${slug}`}
        >
          Buy Now
        </button>
        <div className='card-forSale__shipping-info'>
          <img src='/images/shipping-truck.png' alt='Shipping Truck Icon' />
          <div>
            <p>
              <strong>FREE SHIPPING!</strong>
            </p>
            <p>
              <strong>Shipping Time:</strong> Please allow up to 16 days for
              your print to arrive. (14 days shipping + 2 days handling). It is
              very likely that your print will arrive much sooner, but we don't
              want to set too high of expectations and upset our customers.
            </p>
            <p>
              Your art print will be placed between two stiff pieces of
              cardboard and put inside a poly bag to protect it from the
              elements. It will then be mailed via USPS in a flat mailer. We put
              a "Do Not Bend" sticker on the front and expect mail carriers to
              respect the request.
            </p>
          </div>
        </div>
        <div className='card-forSale__guarantee-info'>
          <img src='/images/guarantee-badge-icon.png' alt='Guarantee Icon' />
          <p>
            We Guarantee a quality art print. If your print arrives in poor
            condition, please contact us and we will resolve the issue swiftly!
          </p>
        </div>
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
          <div className='sheet__gallery'>
            <Img fluid={data.datoCmsWork.coverImage.fluid} />
          </div>
        </div>
        {isForSale && (
          <ForSale
            slug={data.datoCmsWork.slug}
            productTitle={data.datoCmsWork.title}
            productImageUrl={data.datoCmsWork.productImage.url}
            productImageFluid={data.datoCmsWork.productImage.fluid}
            productShortDescription={data.datoCmsWork.productShortDescription}
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
      productShortDescription
      productDescription
    }
  }
`;
