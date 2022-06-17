import styled from 'styled-components';
import { mobile } from "../responsive";

type Props = {
    isValueDropped: boolean;
  };
  
  export const Wrapper = styled.div<Props>`
    align-items: center;
    background-color: #F3F5F7;
    font-family: 'Poppins',sans-serif;
    width: 100%;
    height: 20vh;
    display: flex;
    gap:3rem;
    justify-content: center;
    
  span {
    
    color: ${(props) => (props.isValueDropped ? 'red' : 'green')};
    transform: ${props => props.isValueDropped  ? `scale(1.2)` : `scale(2)`};
    transition:all 0.5s ease;
`;

export const GrSpan = styled.div<Props>`
color: ${(props) => (props.isValueDropped ? 'red' : 'green')};
transform: ${props => props.isValueDropped  ? `scale(1.2)` : `scale(2)`};
transition:all 0.5s ease;
`

export const SpotPriceDiv = styled.div<Props>`
color: ${(props) => (props.isValueDropped ? 'red' : 'green')};
font-size: 40px;
font-weight:500px;
`

