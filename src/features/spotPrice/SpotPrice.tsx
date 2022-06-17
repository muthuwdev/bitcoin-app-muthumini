import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import { fetchSpotPrice, selectBitcoinPrice } from './SpotPriceSlice';

const SpotPrice = () => {
  const dispatch = useAppDispatch();

  const currentPrice = useAppSelector(selectBitcoinPrice);
  const [bitCPrice, setBitCPrice] = useState(currentPrice.price / 100);
  console.log('SPOT Price Rendered');
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchSpotPrice());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    setBitCPrice(currentPrice.price / 100);
  }, [currentPrice]);

  return <div>SpotPrice - {bitCPrice}</div>;
};
export default SpotPrice;
