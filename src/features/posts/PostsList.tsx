import { useSelector } from 'react-redux';
import {  getPostsStatus, getPostsError,selectLatestPosts } from './PostsSlice';
import {ContentSection} from '../../styles/PostsList.styles';
import PostsItem from './PostsItem';
import { RootState } from '../../app/store';


const PostsList = () => {
  let orderedPostIds = useSelector((state:RootState) => selectLatestPosts(state, 4));
  

  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  let content;
  if (postStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((post) => (
      <PostsItem key={post.publish_date} postItm={post} />
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <ContentSection>{content}</ContentSection>;
};
export default PostsList;
