import styled from 'styled-components';
import { mobile } from "../responsive";

export const Container = styled.div`
  height: 3%;
 

  ${mobile({ height: "50px" })}
`;

export const Wrapper = styled.div`
  padding: 0px 50px;
  background-color:#668cff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
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
`;



export const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export const Topic = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;