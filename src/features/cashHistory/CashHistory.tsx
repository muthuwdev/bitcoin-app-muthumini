
import {  useAppDispatch, useAppSelector } from '../../reduxHooks';
import {ChartContainer,ChartArea} from '../../styles/ChartHistory.styles';
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

type FormattedChartVals = {
  date:string,
  value:number,
}

const CashHistory = () => {
  const historyStatus = useAppSelector(getHistoryStatus);
  const error = useAppSelector(getHistoryError);
  const historyDataPerWeek = useAppSelector((state) =>
    selectPartialHistoryData(state, 30)
  );
// const [formattedValArr,setFormattedValArr] = useState(new Array<FormattedChartVals>())
// const [chartMaxBch,setChartMaxBch] = useState(0);
// const [chartMinBch,setChartMinBch] = useState(0);
const [ticksArr,setTicksArr] = useState(new Array<number>());

let formattedValArr = new Array<FormattedChartVals>();
  if (historyDataPerWeek) {
     let  formattedValsTemp = historyDataPerWeek.map((x:HistoryItem) => {
        return { date: x[0].substr(0, 10), value: Number(x[1]) / 100 };
      });
      formattedValArr =formattedValsTemp;
    }
    
      const ids = formattedValArr.map(object => {
        return object.value;
      });
    //   setChartMaxBch(Math.max(...ids)+20);
    //   setChartMinBch(Math.min(...ids)-10);
    let chartMaxBch = Math.max(...ids)+20;
    let chartMinBch = Math.max(...ids)-10;
    



  let content;
 
  if (historyStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (historyStatus === 'succeeded') {
    content = (
      
        <ResponsiveContainer width="100%" height="100%">
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
          <XAxis dataKey="date" />
          <YAxis
            domain={[chartMinBch, chartMaxBch]}
            interval="preserveEnd"
            orientation="right"
            dataKey="value"
          />
          <Tooltip />
          <Legend />
          {/* <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" /> */}
          <ReferenceLine y={220} label="Max" stroke="red" />
          <ReferenceLine y={100} label="Max" stroke="blue" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
    );
  } else if (historyStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <ChartContainer>
      <ChartArea>{content}</ChartArea>
    </ChartContainer>
  );
};

export default CashHistory;
