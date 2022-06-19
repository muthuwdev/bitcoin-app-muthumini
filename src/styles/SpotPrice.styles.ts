import styled from 'styled-components';
import { mobile } from "../responsive";

type Props = {
    isValueDropped: boolean;
  };
  
  export const Wrapper = styled.div<Props>`
    align-items: center;
    background-color: #F3F5F7;
    font-family: 'Poppins',sans-serif;
    border:1px solid orange;
    width: 100%;
    
    display: flex;
    gap:1rem;
    justify-content: center;
    
  div {
    margin-right:1rem;
    color: ${(props) => (props.isValueDropped ? 'red' : 'green')};
transform: ${props => props.isValueDropped  ? `scale(1.1)` : `scale(1.2)`};
transition:all 0.5s ease;
font-size: 30px;
font-weight:500px;
`;

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

