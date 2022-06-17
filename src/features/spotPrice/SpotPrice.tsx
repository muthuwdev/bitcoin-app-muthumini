import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import {
  fetchSpotPrice,
  selectBitcoinPrice,
  selectBitcoinPriceStatus,
} from './SpotPriceSlice';
import { selectPartialHistoryData } from '../cashHistory/CashHistorySlice';
import { GrSpan, SpotPriceDiv, Wrapper } from '../../styles/SpotPrice.styles';
import { GrBitcoin } from 'react-icons/gr';
//

const SpotPrice = () => {
  const dispatch = useAppDispatch();

  const currentPrice = useAppSelector(selectBitcoinPrice);
  const [bitCPrice, setBitCPrice] = useState(currentPrice.price / 100);
  const [isValueDropped, setIsValueDropped] = useState(false);
  const openPriceOfDay = useAppSelector((state) =>
    selectPartialHistoryData(state, 1)
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
    // if (openPriceOfDay[0] && bitCPrice < openPriceOfDay[0][1]) {
    //   setIsValueDropped(true);
    // }
    if (openPriceOfDay[0] && bitCPrice < 121.76) {
      setIsValueDropped(true);
    } else {
      setIsValueDropped(false);
    }
  }, [bitCPrice, currentPrice, openPriceOfDay]);

  return (
    <Wrapper isValueDropped={isValueDropped}>
      {retrievePriceStatus === 'succeeded' ? (
        <>
          {' '}
          <GrSpan isValueDropped={isValueDropped}>
            <GrBitcoin />
          </GrSpan>
          <SpotPriceDiv isValueDropped={isValueDropped}>
            Current Spot Price - {bitCPrice}
          </SpotPriceDiv>
        </>
      ) : (
        <>Loading ..</>
      )}
    </Wrapper>
  );
};
export default SpotPrice;
