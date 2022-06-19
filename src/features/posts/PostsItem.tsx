import { Post } from './PostsSlice';
import {
  Wrapper,
  PostContainer,
  PostImage,
  CardTittle,
  Excerpt,
  ReadMore,
  ReadMoreSpan,
} from '../../styles/PostItem.styles';
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
type Props = {
  postItm: Post;
};
const PostsItem: React.FC<Props> = ({ postItm }) => {
  return (
    <Wrapper>
      <PostContainer>
        <PostImage src={postItm.thumbnail} alt="" />
        <CardTittle>{postItm.title}</CardTittle>
        <Excerpt>{postItm.excerpt}</Excerpt>
        <ReadMore>
          <div>
            <BsFillCalendarWeekFill />
            <span>{postItm.publish_date}</span>
          </div>
          <div>
            <ReadMoreSpan>
              <FiExternalLink />
              <a href={postItm.href} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </ReadMoreSpan>
          </div>
        </ReadMore>
      </PostContainer>
    </Wrapper>
  );
};

export default PostsItem;
