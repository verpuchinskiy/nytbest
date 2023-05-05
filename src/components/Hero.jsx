import React from "react";
import styled from "styled-components";
import { BlueColor, YellowColor } from "../../variables";
import Butterflies from "../assets/10390.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 70vh;
  background-color: ${YellowColor};
  display: flex;
  justify-content: center;

  @media (max-width: 800px) {
    
  }
`;

const Wrapper = styled.div`
  width: 1920px;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;

  @media (max-width: 550px) {
    padding-bottom: 40px;
  }
`;

const Right = styled.div`
  flex: 1;
  padding-bottom: 80px;

  @media (max-width: 1200px) {
    transform: translateX(10%);
  }

  @media (max-width: 550px) {
    transform: translateX(0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Header = styled.h1`
  font-weight: 800;
  line-height: 2.5rem;
  color: ${BlueColor};
  width: 70%;
  margin-bottom: 20px;

  @media (max-width: 800px) {
    font-size: 1.5rem;
    line-height: 2.2rem;
  }

  @media (max-width: 650px) {
    font-size: 1.3rem;
    line-height: 2rem;
    margin-bottom: 10px;
  }

  @media (max-width: 550px) {
    text-align: center;
  }
`;

const Paragraph = styled.p`
  width: 70%;
  line-height: 1.5rem;
  margin-bottom: 30px;

  @media (max-width: 800px) {
    font-size: 0.9rem;
  }

  @media (max-width: 650px) {
    margin-bottom: 20px;
    font-size: 0.8rem;
  }

  @media (max-width: 550px) {
    text-align: center;
  }
`;

const HeroImg = styled.img`
  height: 50%;
  width: auto;

  @media (max-width: 950px) {
    width: 75%;
    height: auto;
  }

  @media (max-width: 550px) {
    width: 50%;
    margin-top: 10px;
  }

  @media (max-width: 375px) {
    width: 50%;
    margin-top: 0;
  }
`;

const Button = styled.button`
  padding: 20px;
  border: none;
  border-radius: 16px;
  background-color: ${BlueColor};
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:active {
    background-color: #1669bd;
    transform: translateY(2px);
  }

  @media (max-width: 800px) {
    font-size: 0.8rem;
    padding: 16px;
    border-radius: 12px;
  }
`;

export const Hero = ({ categoriesArray }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * categoriesArray.length);
    const randomCategory = categoriesArray[randomIndex].list_name_encoded;
    navigate(`/${randomCategory}`);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <HeroImg src={Butterflies} />
        </Left>
        <Right>
          <Header>
            Open a Totally New World With Bestsellers From New York Times!
          </Header>
          <Paragraph>
            Choose your next favorite book by checking the ratings and reviews
            from the world-famous newspaper!
          </Paragraph>
          <Button onClick={handleClick}>Begin the Journey</Button>
        </Right>
      </Wrapper>
    </Container>
  );
};
