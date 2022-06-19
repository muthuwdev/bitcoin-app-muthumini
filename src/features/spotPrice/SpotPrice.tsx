import React, { useState, useEffect, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';

import {
  fetchSpotPrice,
  selectBitcoinPrice,
  selectBitcoinPriceStatus,
} from './SpotPriceSlice';
import { selectLatestHistoryData } from '../cashHistory/CashHistorySlice';
import {
  Wrapper,
  SpotPriceContent,
  OpenPriceContent,
} from '../../styles/SpotPrice.styles';
import { GrBitcoin } from 'react-icons/gr';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import Loader from '../../components/Loader';

const SpotPrice = () => {
  const dispatch = useAppDispatch();

  const currentPrice = useAppSelector(selectBitcoinPrice);
  const [openPriceDisplay, setOpenPriceDisplay] = useState(0);

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
    if (openPriceOfDay) {
      let open = openPriceOfDay[1] / 100;
      setOpenPriceDisplay(open);
      if (bitCPrice < open) setIsValueDropped(true);
    } else {
      setIsValueDropped(false);
    }
  }, [bitCPrice, openPriceDisplay, openPriceOfDay]);

  return (
    <Wrapper>
      {retrievePriceStatus === 'succeeded' ? (
        <Fragment>
          <SpotPriceContent isValueDropped={isValueDropped}>
            <GrBitcoin />
            Current Spot Price {bitCPrice.toFixed(2)}
            <span>
              USD
              {isValueDropped ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
            </span>
          </SpotPriceContent>
          <OpenPriceContent isValueDropped={isValueDropped}>
            Open Price {openPriceDisplay.toFixed(2)} <span>USD</span>
          </OpenPriceContent>
        </Fragment>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};
export default SpotPrice;
