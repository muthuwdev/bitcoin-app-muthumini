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
            <a
              href="https://muthuminiw-portfolio.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Candidate : Muthumini Waidyarathna
            </a>
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
