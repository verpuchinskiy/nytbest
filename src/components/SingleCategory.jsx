import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 4px;
  padding: 40px 30px;
  display: flex;
  align-items: center;
  width: 200px;
  height: 80px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(2px);
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
    z-index: -1;
  }

  @media (max-width: 320px) {
    width: 160px;
    height: 60px;
  }
`;

const Left = styled.div`
  position: absolute;
  left: 7px;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 0.7rem;
`;
const Center = styled.div`
  flex: 2;
`;
const Right = styled.div`
  position: absolute;
  right: 7px;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 0.7rem;
`;

const CategoryName = styled.span`
  color: white;
`;

export const SingleCategory = ({ name, bgImage, newest, oldest }) => {
  return (
    <Container bgImage={bgImage}>
      <Left>
        <span style={{marginBottom: "4px"}}>First List:</span>
        {oldest}
      </Left>
      <Center>
        <CategoryName>{name}</CategoryName>
      </Center>
      <Right>
        <span style={{marginBottom: "4px"}}>Last List:</span>
        {newest}
      </Right>
    </Container>
  );
};
