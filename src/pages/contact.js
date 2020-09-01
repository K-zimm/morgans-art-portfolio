import React from 'react';
import Layout from '../components/layout';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { navigate } from 'gatsby-link';
import { graphql } from 'gatsby';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const Contact = ({ data }) => {
  const [state, setState] = React.useState({});

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  return (
    <Layout>
      <article className='contact'>
        <HelmetDatoCms seo={data.contact.seoMetaTags} />
        <div className='contact__inner'>
          <h1 className='contact__title'>Contact Me</h1>
          <p className='contact__content'>
            Hello! You can contact me by messaging me on Facebook, Instragram or
            sending me an email. Links are below (click on icons). If you are
            interested in commisioning art work from me, please fill out the
            form below. I can't wait to hear your ideas!
          </p>
          <p className='contact__social'>
            {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
              <a
                key={profile.profileType}
                href={profile.url}
                target='blank'
                className={`social social--${profile.profileType.toLowerCase()}`}
              >
                {' '}
              </a>
            ))}
          </p>
          <h2 className='contact__formTitle'>Request A Commision</h2>
          <form
            className='contact__form'
            name='commision-request'
            method='post'
            data-netlify='true'
            data-netlify-honeypot='bot-field'
            action='/thank-you/'
            onSubmit={handleSubmit}
          >
            <input type='hidden' name='form-name' value='commision-request' />
            <p>
              <input type='hidden' name='bot-field' onChange={handleChange} />
            </p>
            <p>
              <input
                type='text'
                name='name'
                placeholder='NAME'
                onChange={handleChange}
              />
            </p>
            <p>
              <input
                type='email'
                name='email'
                placeholder='EMAIL'
                onChange={handleChange}
              />
            </p>
            <p>
              <textarea
                name='message'
                placeholder='Describe what you would like me to create.'
                onChange={handleChange}
              />
            </p>
            <p>
              <button type='submit'>Send Request</button>
            </p>
          </form>
        </div>
      </article>
    </Layout>
  );
};

export default Contact;

export const query = graphql`
  query ContactQuery {
    contact: datoCmsContactPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          profileType
          url
        }
      }
    }
  }
`;
