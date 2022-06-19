import { useSelector } from 'react-redux';
import { getPostsStatus, getPostsError, selectLatestPosts } from './PostsSlice';
import { ContentSection } from '../../styles/PostsList.styles';
import PostsItem from './PostsItem';
import { RootState } from '../../app/store';
import Loader from '../../components/loader/Loader';
import { ResponseStatus } from '../../enums';

const PostsList = () => {
  let orderedPostIds = useSelector((state: RootState) =>
    selectLatestPosts(state, 4)
  );

  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  let content;
  if (postStatus === ResponseStatus.LOADING) {
    content = (
      <div>
        <Loader />
      </div>
    );
  } else if (postStatus === ResponseStatus.SUCCEEDED) {
    content = orderedPostIds.map((post) => (
      <PostsItem key={post.publish_date} postItm={post} />
    ));
  } else if (postStatus === ResponseStatus.FAILED) {
    content = <p>{error}</p>;
  }

  return <ContentSection>{content}</ContentSection>;
};
export default PostsList;
