import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

import {RootState} from '../../app/store';

const CASH_HISTORY_URL = 'https://index-api.bitcoin.com/api/v0/cash/history';



export type HistoryItem = [string,  number];
const cashHistoryAdapter = createEntityAdapter<HistoryItem>({
    // Assume  date string as the id
  selectId: (historyItem) => historyItem[0],
});
const initialState = cashHistoryAdapter.getInitialState({
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: '',
});
export const fetchCashHistory = createAsyncThunk(
  'history/fetchCashHistory',
  async () => {
    const response = await axios.get(CASH_HISTORY_URL);
    console.log('Retrieved ', response);
    return response;
  }
);

const cashHistorySlice = createSlice({
  name: 'cashHistory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCashHistory.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCashHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message|| '';
      })
      .addCase(fetchCashHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedCashHistory = action.payload.data;
        cashHistoryAdapter.upsertMany(state, loadedCashHistory);
      });
  },
});

//getSelectors creates these selectors rename them with aliases using destructuring
export const {
  selectAll: selectAllCashHistory,
  selectById: selectCashHistoryById,
  selectIds: selectCashHistoryIds,
  // Pass in a selector that returns the cash History slice of state
} = cashHistoryAdapter.getSelectors<RootState>((state) => state.cashHistory);

export const selectPartialHistoryData = createSelector(
  [selectAllCashHistory, (state, numOfDates) => numOfDates],
  (cashHistory, numOfDates) => cashHistory.slice(0, numOfDates)
);

export const selectLatestHistoryData = createSelector(
  [selectAllCashHistory, (state) => {}],
  (cashHistory) => cashHistory[0]
);


export const getHistoryStatus = (state:RootState) => state.cashHistory.status;
export const getHistoryError = (state:RootState) => state.cashHistory.error;

export default cashHistorySlice.reducer;
