import { Link } from 'react-router-dom';
import {
  Center,
  Container,
  Left,
  Topic,
  MenuItem,
  Right,
  ProfileContainer,
  Wrapper,
} from '../styles/Header.styles';

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <ProfileContainer>
            Candidate : Muthumini Waidyarathna
          </ProfileContainer>
        </Left>
        <Center>
          <Topic>Bitcoin.com Assignment</Topic>
        </Center>
        <Right>
          <Link to="/">
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <Link to="/post">
            <MenuItem>Posts</MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
