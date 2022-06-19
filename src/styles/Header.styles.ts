import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from "../responsive";

export const Container = styled.div`
  height: 10vh;
  width:100%;
  ${mobile({ display:"none",height: "50px" })}
`;

export const Wrapper = styled.div`
  padding: 0px 50px;
  background-color:#668cff;
  color:#5200cc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "0px" })}
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;



export const ProfileContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  a{
    text-decoration:none;
    &:hover {
      
      color:white;
    
    }
  }
`;



export const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export const Topic = styled.h1`
  font-weight: bold;
  ${mobile({ color: "red" })}
`;
export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
 
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

export const MenuItem = styled.div`
  font-size: 18px;
  text-decoration:none;
  cursor: pointer;
  margin-left: 25px;
  color:#5200cc;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

export const NavLinkt = styled(Link)` 
  text-decoration: none;
  font-weight:bold;
  &:hover{
    color:white;
    transform: scale(1.1);
transition:all 0.5s ease;
  }
  
`;