import styled from 'styled-components';
import { mobile } from "../responsive";

export const Wrapper = styled.article`
    align-items: center;
    background-color: #F3F5F7;
    font-family: 'Poppins',sans-serif;
    width: 100%;
    min-height: 90vh;
    color: #1B1C34;
    display: flex;
    justify-content: space-between;

`;

export const PostContainer = styled.div`
max-width: 70%;
margin: 0 auto;
height: 100%;
display:flex;
flex-direction:column;
align-items: center;
justify-content: space-around;

box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);
padding:2px;
`;

// export const PostItem = styled.div`
// overflow: hidden;
// padding: 20px;
// background-color: #FFF;
// border-radius: 30px;
// text-align: center;

// `;




export const PostImage = styled.img`
width: 100%;
height: 300px;
    border-radius: 20px;
    object-fit: cover;
`;
export const CardBody = styled.div`
width: 100%;
padding: 26px 20px 36px 20px;
`;
export const CardTittle = styled.h2`
font-family: 'Merriweather',
serif;
font-weight: 900;
text-transform: capitalize;

font-size: 26px;
padding-bottom: 15px;
`;

export const Excerpt = styled.p`
font-weight: 500;
    font-size: 15px;
   
    text-align:center;
`;

export const ReadMore = styled.div`
display:flex;
align-items: center;
justify-content: center;
gap:2rem;
padding-bottom:3rem;
div{span{font-size:12px;padding-left:5px}}
  `
  export const ReadMoreSpan = styled.span`
  font-size:14px;
  font-weight:400;
  background-color:black;
  color:white;
  padding:3px;
  border-radius:10px`
  
export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;