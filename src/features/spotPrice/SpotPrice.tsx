import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';

import {
  fetchSpotPrice,
  selectBitcoinPrice,
  selectBitcoinPriceStatus,
} from './SpotPriceSlice';
import { selectLatestHistoryData } from '../cashHistory/CashHistorySlice';
import { Wrapper } from '../../styles/SpotPrice.styles';
import { GrBitcoin } from 'react-icons/gr';
//

const SpotPrice = () => {
  const dispatch = useAppDispatch();

  const currentPrice = useAppSelector(selectBitcoinPrice);

  const [bitCPrice, setBitCPrice] = useState(currentPrice.price / 100);
  const [isValueDropped, setIsValueDropped] = useState(false);
  const openPriceOfDay = useAppSelector((state) =>
    selectLatestHistoryData(state)
  );
  const retrievePriceStatus = useAppSelector(selectBitcoinPriceStatus);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchSpotPrice());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    setBitCPrice(currentPrice.price / 100);
  }, [bitCPrice, currentPrice]);

  useEffect(() => {
    if (openPriceOfDay && bitCPrice < openPriceOfDay[1] / 100) {
      setIsValueDropped(true);
    } else {
      setIsValueDropped(false);
    }
  }, [bitCPrice, openPriceOfDay]);

  return (
    <Wrapper isValueDropped={isValueDropped}>
      {retrievePriceStatus === 'succeeded' ? (
        <>
          <div>
            <GrBitcoin />
          </div>
          <div>
            Current Spot Price - {bitCPrice} USD {openPriceOfDay[1]}
          </div>
        </>
      ) : (
        <>Loading ..</>
      )}
    </Wrapper>
  );
};
export default SpotPrice;
