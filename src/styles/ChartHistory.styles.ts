import styled from 'styled-components';


export const ChartWrapper = styled.article`
    align-items: center;
    
    font-family: 'Poppins',sans-serif;
  
    height: 85vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:0;

`;



export const ChartContainer = styled.div`

    align-items: center;
  
    font-family: 'Poppins',sans-serif;
    width: 1000px;
    height:500px;
  
    display:flex;
    align-items:center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);

`;

export const ButtonsBar = styled.div`
width: 60px;
    height: 100%;
  
    justify-content:center;
    
    

`;
export const ChartButtons = styled.button`
width: 60px;
    height: 30px;
    background-color:#668cff;
    border: 1px solid blue;
    margin: 4px 0;
    border-radius:5px;
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
        opacity: 1;
      }
  

`;

export const ChartArea = styled.article`
    width: 100%;
    height: 100%;

`;

