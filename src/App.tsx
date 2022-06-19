import { useAppDispatch } from './reduxHooks';
import { fetchCashHistory } from './features/cashHistory/CashHistorySlice';
import { fetchPosts } from './features/posts/PostsSlice';
import PostsList from './features/posts/PostsList';

import Layout from './components/layout/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { fetchSpotPrice } from './features/spotPrice/SpotPriceSlice';
import Dashboard from './features/dashboard/Dashboard';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchCashHistory());
  dispatch(fetchPosts());
  dispatch(fetchSpotPrice());

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="post">
          <Route index element={<PostsList />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
