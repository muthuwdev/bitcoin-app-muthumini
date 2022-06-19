import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
  } from '@reduxjs/toolkit';
  import axios from 'axios';
  
  import {RootState} from '../../app/store';
import { ResponseStatus } from '../../enums';
  
  const POSTS_URL = 'wp-content/weekly_popular_posts.json';
  
  export type Post = {title:string,
    publish_date:string,
    thumbnail:string,
    excerpt:string,
    href:string,
  };
  
  const postsAdapter = createEntityAdapter<Post>({
    // Assume IDs as pubished date of the post
    selectId: (item) => item.publish_date,
    // Keep it sorted based on published date descending
    sortComparer: (a, b) => b.publish_date.localeCompare(a.publish_date),
  });
  
  const initialState = postsAdapter.getInitialState({
    status: ResponseStatus.IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
    error: '',
  });
  
  export const fetchPosts = createAsyncThunk(
    'weekly_popular_posts.json',
    async () => {
      const response = await axios.get(`${POSTS_URL}`);
      return response;
    }
  );
  
  const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = ResponseStatus.LOADING;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = ResponseStatus.SUCCEEDED;
  
          const loadedPosts = action.payload.data;
          // Add any fetched posts to the array
          postsAdapter.upsertMany(state, loadedPosts);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = ResponseStatus.FAILED;
          state.error = action.error.message|| '';
        });
    },
  });
  
  
  export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
    // Pass in a selector that returns the posts slice of state
  } = postsAdapter.getSelectors<RootState>((state) => state.posts);
  
  export const getPostsStatus = (state: RootState) => state.posts.status;
  export const getPostsError = (state: RootState) => state.posts.error;
  
  export const selectLatestPosts = createSelector(
    [selectAllPosts, (state: RootState, numOfPosts:number) => numOfPosts],
    (posts, numOfPosts) => posts.slice(0, numOfPosts)
  );
  
  export default postsSlice.reducer;
  