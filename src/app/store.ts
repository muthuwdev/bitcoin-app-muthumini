import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/PostsSlice';
import cashHistoryReducer from '../features/cashHistory/CashHistorySlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    cashHistory: cashHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'weekly_popular_posts.json/fulfilled',
          'history/fetchCashHistory/fulfilled',
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


