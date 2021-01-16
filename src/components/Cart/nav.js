import React, { useContext } from 'react';
import reduce from 'lodash/reduce';
import { Link } from 'gatsby';

import StoreContext from '../../context/StoreContext';

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);
  const items = checkout ? checkout.lineItems : [];
  const total = reduce(items, (acc, item) => acc + item.quantity, 0);
  return [total !== 0, total];
};

const CartNavigation = () => {
  const [hasItems, quantity] = useQuantity();

  return (
    <Link to='/cart' className='nav-cart'>
      <img src='/images/cart-icon.png' alt='Shopping cart' />
      {hasItems && <span className='nav-cart__items-count'>{quantity}</span>}
    </Link>
  );
};

export default CartNavigation;
