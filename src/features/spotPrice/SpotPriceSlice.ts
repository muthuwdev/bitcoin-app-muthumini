import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { ResponseStatus } from "../../enums";

const SPOT_PRICE = 'https://index-api.bitcoin.com/api/v0/cash/price/usd';

export type SpotPrice={
  price:number;
  stamp:number;
  status:string;
  error:string;
}

const initialState:SpotPrice= {
  price: 0,
  stamp: 0,
  status: ResponseStatus.IDLE,
  error: '',
 
};

export const fetchSpotPrice = createAsyncThunk('current/spotprice', async () => {
    
    const response = await axios.get(`${SPOT_PRICE}`)
    return response;
})

const spotPriceSlice = createSlice({
    name: 'spotPrice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchSpotPrice.fulfilled, (state, action) => {
            const loadedSpotPrice = action.payload.data;
            state.price = loadedSpotPrice.price;
            state.stamp = loadedSpotPrice.stamp;
            state.status = ResponseStatus.SUCCEEDED;

        })
        .addCase(fetchSpotPrice.rejected, (state, action) => {
            state.status = ResponseStatus.FAILED;
            state.error = action.error.message|| '';
        })
    }
})

export const selectBitcoinPrice = (state:RootState) => state.spotPrice;
export const selectBitcoinPriceStatus = (state:RootState) => state.spotPrice.status;


export default spotPriceSlice.reducer