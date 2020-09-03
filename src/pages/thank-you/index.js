import React from 'react';
import Layout from '../../components/layout';

const ThankYou = () => (
  <Layout>
    <article className='thankYou'>
      <div className='thankYou__inner'>
        <h1 className='thankYou__title'>Thank You!</h1>
        <p className='thankYou__content'>
          We have received request for a commision and will be in contact with
          you very soon! If you have mroe questions or it takes me a while to
          answer please call or text me at{' '}
          <a href='tel:+9206642354'>(920)-664-2354</a>
        </p>
      </div>
    </article>
  </Layout>
);

export default ThankYou;
