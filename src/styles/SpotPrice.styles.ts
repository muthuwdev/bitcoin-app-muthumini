import styled from 'styled-components';
import { mobile } from "../responsive";

type Props = {
    isValueDropped: boolean;
  };
  
  export const Wrapper = styled.div`
    align-items: center;
   padding:15px 0;
    font-family: 'Poppins',sans-serif;
  
    width: 100%;
   height:10vh; 
    display: flex;
    gap:2.5rem;
    justify-content: center;
    ${mobile({ height:"5vh"})}
  
`;
export const SpotPriceContent = styled.div<Props>`
margin-right:1rem;
color: ${(props) => (props.isValueDropped ? 'red' : 'green')};
transform: ${props => props.isValueDropped  ? `scale(1.1)` : `scale(1.2)`};
transition:all 0.5s ease;
font-size: 25px;
font-weight:500px;
span{
  font-size:20px;
  ${mobile({ fontSize:"15px", textAlign:"center"})}
  }
${mobile({ fontSize:"15px", textAlign:"center"})}
`;


export const OpenPriceContent = styled.div<Props>`
margin-right:1rem;
color: white;
background: linear-gradient(180deg, #600cff 26.71%, #649cff 99.36%);
border-radius:10px;
padding:4px;
transform: ${props => props.isValueDropped  ? `scale(1.1)` : `scale(1.2)`};
transition:all 0.5s ease;
font-size: 20px;
font-weight:500px;
${mobile({ fontSize:"15px", textAlign:"center"})}
span{
  ${mobile({ fontSize:"15px", textAlign:"center"})}
font-size:15px;
}
}
`



