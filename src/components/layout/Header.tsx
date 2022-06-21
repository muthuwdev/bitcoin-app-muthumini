import {
  Center,
  Container,
  Left,
  Topic,
  MenuItem,
  Right,
  ProfileContainer,
  Wrapper,
  NavLinkt,
} from '../../styles/Header.styles';
import { BiLinkExternal } from 'react-icons/bi';

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
              <BiLinkExternal />
              <span> Muthumini Waidyarathna</span>
            </a>
          </ProfileContainer>
        </Left>
        <Center>
          <Topic>Bitcoin Dashboard</Topic>
        </Center>
        <Right>
          <NavLinkt to="/">
            <MenuItem>Dashboard</MenuItem>
          </NavLinkt>
          <NavLinkt to="/post">
            <MenuItem>Posts</MenuItem>
          </NavLinkt>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
