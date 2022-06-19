import { useAppSelector } from '../../reduxHooks';
import {
  ChartArea,
  ButtonsBar,
  ChartButtons,
  ChartContainer,
} from '../../styles/ChartHistory.styles';
import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
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
  const historyData = useAppSelector((state) =>
    selectPartialHistoryData(state, countedDays)
  );

  let formattedValArr = new Array<FormattedChartVals>();

  if (historyData) {
    let formattedValsTemp = historyData.map((x: HistoryItem) => {
      return { date: x[0].substring(0, 10), value: Number(x[1]) / 100 };
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
  let ticks: number[] = [];
  let dataGap = chartMax - chartMin;
  dataGap = Math.round(dataGap);
  dataGap = Math.round(dataGap / 10);

  if (dataGap <= 0) {
    dataGap = 10;
  } else {
    let dataStr = dataGap.toString();
    dataGap = 10 - Number(dataStr.substring(dataStr.length - 1)) + dataGap;
  }

  const replaced = Math.round(chartMin).toString().slice(0, -1) + '0';
  let startVal = Number(replaced);
  for (let i = startVal; i <= chartMax; ) {
    ticks.push(i);
    i = i + dataGap;
  }
  if (!ticks.includes(chartMax)) {
    ticks.push(chartMax);
  }
  if (!ticks.includes(chartMin)) {
    ticks.push(chartMin);
  }
  ticks = ticks.sort((a, b) => a - b);

  const retrievChartData = (daysCount: number) => {
    setCountedDays(daysCount);
  };

  let content;

  if (historyStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (historyStatus === 'succeeded') {
    content = (
      // <ResponsiveContainer minWidth={900} minHeight={400} width="99%" aspect={3} width="99.9%" height="99.8%">
      <ResponsiveContainer width="99.9%" height="99.8%">
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
          <XAxis
            reversed={true}
            dataKey="date"
            tickFormatter={(str) => {
              const date = parseISO(str);
              return format(date, 'MMM, d');
            }}
          />
          <YAxis
            domain={[chartMinBch, chartMaxBch]}
            interval="preserveEnd"
            orientation="right"
            dataKey="value"
            ticks={ticks}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
          <Tooltip />
          <Legend />

          <ReferenceLine
            y={chartMax}
            label=""
            stroke="#00cc66"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={chartMin}
            label=""
            stroke="#ff4d4d"
            strokeDasharray="3 3"
          />
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
    <>
      <ChartArea>
        <ChartContainer>{content}</ChartContainer>
      </ChartArea>
      <ButtonsBar>
        <ChartButtons onClick={() => retrievChartData(1)}>1D</ChartButtons>
        <ChartButtons onClick={() => retrievChartData(7)}>1W</ChartButtons>
        <ChartButtons onClick={() => retrievChartData(30)}>1M</ChartButtons>
      </ButtonsBar>
    </>
  );
};

export default CashHistory;
