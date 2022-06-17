import React from 'react';
import { useAppDispatch } from './reduxHooks';
import { fetchCashHistory } from './features/cashHistory/CashHistorySlice';
import { fetchPosts } from './features/posts/PostsSlice';
import PostsList from './features/posts/PostsList';

import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import CashHistory from './features/cashHistory/CashHistory';
import { fetchSpotPrice } from './features/spotPrice/SpotPriceSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchCashHistory());
  dispatch(fetchPosts());
  dispatch(fetchSpotPrice());
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CashHistory />} />

        <Route path="post">
          <Route index element={<PostsList />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
