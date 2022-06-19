import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from "../responsive";

export const Container = styled.div`
  height: 10vh;
  width:100%;

`;

export const Wrapper = styled.div`
  padding: 0px 50px;
  background-color:#668cff;
  color:#5200cc;
  display: flex;
  align-items: center;
  font-family: 'Poppins',sans-serif;
  justify-content: space-between;
  ${mobile({ padding: "0px" })}
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: "3" })}
`;



// export const ProfileContainer = styled.div`

//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
//   color:#5200cc;
//   font-family: 'Poppins',sans-serif;
//   font-weight:700;
//   border:1px solid #5200cc

//   a{
//     text-decoration:none;
  
//   }
  
//   ${mobile({ border: "none" })}
  
// `;

export const ProfileContainer = styled.div`
 
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  a{
    text-decoration:none;
    &:hover {
      text-decoration: underline;
  
      color:#b3c6ff;
    
    }
  }
`;



export const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export const Topic = styled.h1`
  font-weight: bold;
  ${mobile({ display: "none" })}
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
  text-align:center;
  margin-right:3rem;
  &:hover{
  
   
    transform: scale(1.1);
transition:all 0.5s ease;
  }
  ${mobile({ marginRight: "1rem" })}
`;