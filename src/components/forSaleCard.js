function ForSale(props) {
  const slug = props.slug;
  const title = props.productTitle;
  const productImageUrl = props.productImageUrl;
  const productShortDescription = props.productShortDescription;
  const productDescription = props.productDescription;
  const price = props.price;

  return (
    <div className='card-forSale'>
      <h2 className='card-forSale__title'>
        Print of {title} available for purchase!
      </h2>
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
