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


// export const SpotPriceContainer = styled.div`
// display:flex
// ${mobile({ flexDirection:"column",})}`;

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

// .button {
//   background: linear-gradient(180deg, teal 26.71%, green 99.36%);
//   box-shadow: 0px 20px 24px 3px rgba(159, 197, 197, 0.737);
//   border-radius: 34px;
//   border: none;
//   color: white;
//   font-size: 16px;
//   padding: 11px 26px 11px 26px;
// }

// export const GrSpan = styled.div<Props>`
// color: ${(props) => (props.isValueDropped ? 'red' : 'green')};
// transform: ${props => props.isValueDropped  ? `scale(1.1)` : `scale(1.2)`};
// transition:all 0.5s ease;
// font-size: 40px;
// font-weight:500px;
// `

// export const SpotPriceDiv = styled.div<Props>`
// color: ${(props) => (props.isValueDropped ? 'red' : 'green')};
// font-size: 30px;
// font-weight:500px;
// `

