import React from "react";
import styled from "styled-components";
import { BlueColor, YellowColor } from "../../variables";
import Favourite from "../assets/favourite_books.png";

const Container = styled.div`
  background-color: ${YellowColor};
  width: 100vw;
`;

const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding: 16px 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 100px;

  @media (max-width: 680px) {
    gap: 40px;
  }

  @media (max-width: 440px) {
    padding: 0 40px 16px;
  }
`;

const TextWrapper = styled.div`
  font-size: 1.1rem;
`;

const Header = styled.h2`
  color: ${BlueColor};
  margin-bottom: 14px;
  letter-spacing: 3px;

  @media (max-width: 620px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }

  @media (max-width: 440px) {
    text-align: center;
  }
`;

const Tagline = styled.p`
  letter-spacing: 2px;

  @media (max-width: 620px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    line-height: 1rem;
  }

  @media (max-width: 440px) {
    text-align: center;
  }
`;

const Image = styled.img`
  width: 200px;

  @media (max-width: 620px) {
    width: 160px;
  }

  @media (max-width: 480px) {
    width: 120px;
  }

  @media (max-width: 440px) {
    display: none;
  }
`;

export const Intro = ({ info }) => {
  return (
    <Container>
      <Wrapper>
        <TextWrapper>
          {info === "info" ? (
            <>
              <Header>Find out your new favourite book &#x2764;&#xfe0f;</Header>
              <Tagline>
                in the selected bestsellers lists from New York Times
              </Tagline>
            </>
          ) : (
            <>
              <Header>Find a book in NY Times bestsellers history</Header>
              <Tagline>
                search for it by author name, book title or isbn number
              </Tagline>
            </>
          )}
        </TextWrapper>
        <Image src={Favourite} />
      </Wrapper>
    </Container>
  );
};
