import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import Layout from '../components/layout';

const About = ({ data: { about } }) => (
  <Layout>
    <article className='about'>
      <HelmetDatoCms seo={about.seoMetaTags} />
      <div className='about__inner'>
        <div className='about__text-row'>
          <h1 className='about__title'>{about.title}</h1>
          <p className='about__lead'>{about.subtitle}</p>
          <div
            className='about__body'
            dangerouslySetInnerHTML={{
              __html: about.bioNode.childMarkdownRemark.html,
            }}
          />
        </div>
        <div className='about__image-row'>
          <Img fluid={about.image1.fluid} />
          <Img fluid={about.image2.fluid} />
          <Img className='crop__right-center' fluid={about.image3.fluid} />
          <Img fluid={about.image4.fluid} />
        </div>
      </div>
    </article>
  </Layout>
);

export default About;

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      bioNode {
        childMarkdownRemark {
          html
        }
      }
      image1 {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      image2 {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      image3 {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
      image4 {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
    }
  }
`;
