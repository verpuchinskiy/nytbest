import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BlueColor, YellowColor } from "../../variables";
import PoweredBy from "../assets/poweredby.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${YellowColor};
  width: 100vw;
`;

const Wrapper = styled.div`
  width: 1920px;
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 40px;
  }

  @media (max-width: 300px) {
    padding: 30px;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Center = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 1;
  text-align: right;
`;

const Logo = styled.span`
  font-weight: 600;
  font-size: 1.3rem;
`;

const Menu = styled.ul`
  justify-content: flex-end;
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style: none;

  @media (max-width: 300px) {
    font-size: 0.9rem;
  }
`;

const MenuItem = styled.li``;

const PoweredImg = styled.img``;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;

  &:hover {
    color: ${BlueColor};
  }
`;

export const Footer = ({ categoriesArray, bookCategory }) => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>
            <FooterLink to="/nytbest">NytBest</FooterLink>
          </Logo>
        </Left>
        <Center>
          <Menu>
            <MenuItem>
              <FooterLink to="/nytbest">Home</FooterLink>
            </MenuItem>
            <MenuItem>
              <FooterLink to="/bestsellers">Bestsellers</FooterLink>
            </MenuItem>
            <MenuItem>
              <FooterLink to="/search">Search</FooterLink>
            </MenuItem>
          </Menu>
        </Center>
        <Right>
          <PoweredImg src={PoweredBy} />
        </Right>
      </Wrapper>
    </Container>
  );
};
