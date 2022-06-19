import styled from 'styled-components';
import { mobile } from "../responsive";


export const ChartContainer = styled.div`

    align-items: center;
  
    font-family: 'Poppins',sans-serif;
    width: 1000px;
    height:500px;
  padding:0px;
    display:flex;
    align-items:center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);
    overflow-x: auto;
    overflow-y: hidden;
   

`;

export const ChartArea = styled.article`
    width: 100%;
    height: 100%;
  
    align-items:center;
    justify-content:center;
    display:flex;
`;


export const ButtonsBar = styled.div`
width: 60px;
  display:flex;
  gap:1rem;
    justify-content:center;
    
    

`;
export const ChartButtons = styled.button`
width: 60px;
    height: 30px;
    background-color:blue;
    border: 1px solid blue;
    margin: 4px 0;
    color:white;
    border-radius:5px;
    opacity:0.8;
    cursor:pointer;
    box-shadow: 0px 2px 10px 5px #668cff;
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
        opacity: 1;
        color:#600cff
      }
  

`;

//#600cff


