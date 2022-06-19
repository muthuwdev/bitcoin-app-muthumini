
import styled from 'styled-components'
import { keyframes } from 'styled-components'


const rotateAnimation = keyframes`
    to {
      transform: rotateZ(-360deg);
     }
`

export const LoadingPanel = styled.div`
width: 100%;
height: 100%;
background-color: white;
display: grid;
place-items: center;
max-width: 100%;
div{
    width: 4vmax;
    height: 4vmax;
    border-bottom: 5px solid rgba(0, 0, 0, 0.719);
  
    border-radius: 50%;
    animation-name: ${rotateAnimation};
    animation-duration: 800ms;
    animation-iteration-count: infinite;
  
  
}

`;



// .loading {

//   }
  
//   .loading > div {
    // width: 10vmax;
    // height: 10vmax;
    // border-bottom: 5px solid rgba(0, 0, 0, 0.719);
  
    // border-radius: 50%;
  
    // animation: loadingRotate 800ms linear infinite;
//   }
  
//   @keyframes loadingRotate {
//     to {
//       transform: rotateZ(-360deg);
//     }
//   }
  