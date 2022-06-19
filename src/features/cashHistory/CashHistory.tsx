import { useAppSelector } from '../../reduxHooks';
import {
  ChartArea,
  ButtonsBar,
  ChartButtons,
  ChartContainer,
} from '../../styles/ChartHistory.styles';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  getHistoryStatus,
  getHistoryError,
  selectPartialHistoryData,
  HistoryItem,
  FormattedChartVals,
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
import Loader from '../../components/loader/Loader';
import { ResponseStatus } from '../../enums';
import { error } from 'console';

export type ChartMinMaxVals = {
  min: number;
  max: number;
};

const CashHistory = () => {
  const historyStatus = useAppSelector(getHistoryStatus);
  const error = useAppSelector(getHistoryError);
  // let ticks: number[] = [];
  const [formattedTicks, setFormattedTicks] = useState(new Array<number>());
  // const [chartMaxBch, setChartMaxBch] = useState(0);
  // const [chartMinBch, setChartMinBch] = useState(0);
  const [chartMinMax, setChartMinMax] = useState(new Array<ChartMinMaxVals>());

  const [countedDays, setCountedDays] = useState(30);
  const formattedValArr = useAppSelector((state) =>
    selectPartialHistoryData(state, countedDays)
  );

  // let formattedValArr = new Array<FormattedChartVals>();

  // if (historyData) {
  //   let formattedValsTemp = historyData.map((x: HistoryItem) => {
  //     return { date: x[0].substring(0, 10), value: Number(x[1]) / 100 };
  //   });
  //   formattedValArr = formattedValsTemp;
  // }

  // useEffect(() => {
  //   }, []);

  useEffect(() => {
    const ids = formattedValArr.map((object) => {
      return object.value;
    });
    if (ids) {
      let chartMax = Math.max(...ids);
      let chartMin = Math.min(...ids);
      // setChartMaxBch(chartMax + 20);
      // setChartMinBch(chartMin  - 10);
      setChartMinMax([{ min: chartMin - 10, max: chartMax + 20 }]);
    }
  }, [formattedValArr]);

  useEffect(() => {
    if (chartMinMax.length) {
      const chartMin = chartMinMax[0].min;
      const chartMax = chartMinMax[0].max;
      let dataGap = -chartMin;
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
      let ticks = [];
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
      setFormattedTicks(ticks.sort((a, b) => a - b));
    }
  }, [chartMinMax]);

  // let ticks: number[] = [];
  // let dataGap = chartMax - chartMin;
  // dataGap = Math.round(dataGap);
  // dataGap = Math.round(dataGap / 10);

  const retrievChartData = (daysCount: number) => {
    setCountedDays(daysCount);
  };

  let content;

  if (historyStatus === ResponseStatus.LOADING) {
    content = (
      <div>
        <Loader />
      </div>
    );
  } else if (historyStatus === ResponseStatus.SUCCEEDED && chartMinMax.length) {
    content = (
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
            domain={[chartMinMax[0].min, chartMinMax[0].max]}
            interval="preserveEnd"
            orientation="right"
            label={{
              value: 'Historical Price(USD)',
              position: 'outsideRight',
            }}
            dataKey="value"
            ticks={formattedTicks}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
          <Tooltip />
          <Legend />

          <ReferenceLine
            y={chartMinMax[0].max - 20}
            label=""
            stroke="#00cc66"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={chartMinMax[0].min + 10}
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
  } else if (historyStatus === ResponseStatus.FAILED) {
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
