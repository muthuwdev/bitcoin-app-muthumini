import React from 'react';
import { ChartContainer, ChartWrapper } from '../../styles/Dashboard.styles';
import CashHistory from '../cashHistory/CashHistory';
import SpotPrice from '../spotPrice/SpotPrice';

const Dashboard = () => {
  return (
    <ChartWrapper>
      <SpotPrice />

      <CashHistory />
    </ChartWrapper>
  );
};

export default Dashboard;
