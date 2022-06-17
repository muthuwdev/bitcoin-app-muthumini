import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/PostsSlice';
import cashHistoryReducer from '../features/cashHistory/CashHistorySlice';
import spotPriceReducer from '../features/spotPrice/SpotPriceSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    cashHistory: cashHistoryReducer,
    spotPrice: spotPriceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'weekly_popular_posts.json/fulfilled',
          'history/fetchCashHistory/fulfilled',
          'current/spotprice/fulfilled',
        ],
        ignoredPaths: [
          'posts.entities.undefined',
          'cashHistory.entities.undefined',
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


