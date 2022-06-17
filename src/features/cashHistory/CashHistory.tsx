import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import {
  ChartContainer,
  ChartArea,
  ChartWrapper,
  ButtonsBar,
  ChartButtons,
} from '../../styles/ChartHistory.styles';
import React, { useState, useEffect } from 'react';
import {
  getHistoryStatus,
  getHistoryError,
  selectPartialHistoryData,
  HistoryItem,
} from './CashHistorySlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import SpotPrice from '../spotPrice/SpotPrice';

type FormattedChartVals = {
  date: string;
  value: number;
};

const CashHistory = () => {
  const historyStatus = useAppSelector(getHistoryStatus);
  const error = useAppSelector(getHistoryError);

  const [countedDays, setCountedDays] = useState(30);
  const historyDataPerWeek = useAppSelector((state) =>
    selectPartialHistoryData(state, countedDays)
  );
  const [ticksArr, setTicksArr] = useState(new Array<number>());
  // const [chartViewData, setChartViewData] = useState(historyDataPerWeek);

  let formattedValArr = new Array<FormattedChartVals>();
  if (historyDataPerWeek) {
    let formattedValsTemp = historyDataPerWeek.map((x: HistoryItem) => {
      return { date: x[0].substr(0, 10), value: Number(x[1]) / 100 };
    });
    formattedValArr = formattedValsTemp;
  }

  const ids = formattedValArr.map((object) => {
    return object.value;
  });
  let chartMax = Math.max(...ids);
  let chartMin = Math.min(...ids);
  let chartMaxBch = chartMax + 20;
  let chartMinBch = chartMin - 10;

  const retrievChartData = (daysCount: number) => {
    setCountedDays(daysCount);
  };

  let content;

  if (historyStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (historyStatus === 'succeeded') {
    content = (
      <ResponsiveContainer minWidth={900} minHeight={400}>
        <LineChart
          width={500}
          height={300}
          data={formattedValArr}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis reversed={true} dataKey="date" />
          <YAxis
            domain={[chartMinBch, chartMaxBch]}
            interval="preserveEnd"
            orientation="right"
            dataKey="value"
          />
          <Tooltip />
          <Legend />
          {/* <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" /> */}
          <ReferenceLine
            y={chartMax}
            label=""
            stroke="#00cc66"
            strokeDasharray="3 3"
          />
          {/* <Line dataKey={chartMax} dot={{ stroke: 'red', strokeWidth: 2 }} /> */}
          <ReferenceLine
            y={chartMin}
            label=""
            stroke="#ff4d4d"
            strokeDasharray="3 3"
          />
          {/* <Line type="monotone" dataKey="value" stroke="#8884d8" /> */}
          {/* <Line dataKey={chartMax} dot={{ stroke: 'red', strokeWidth: 2 }} /> */}
          <Line
            dataKey="value"
            activeDot={{ stroke: 'blue', strokeWidth: 1, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  } else if (historyStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <ChartWrapper>
      <SpotPrice />

      <ChartContainer>
        <ChartArea>{content}</ChartArea>
        <ButtonsBar>
          <ChartButtons onClick={() => retrievChartData(1)}>1D</ChartButtons>
          <ChartButtons onClick={() => retrievChartData(7)}>1W</ChartButtons>
          <ChartButtons onClick={() => retrievChartData(30)}>1M</ChartButtons>
        </ButtonsBar>
      </ChartContainer>
    </ChartWrapper>
  );
};

export default CashHistory;
