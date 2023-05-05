import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BlueColor, DarkColor, YellowColor } from "../../variables";

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

  @media (max-width: 420px) {
    flex-direction: column;
    gap: 30px;
  }

  @media (max-width: 300px) {
    padding: 30px;
  }
`;

const Logo = styled.span`
  font-weight: 600;
  font-size: 1.3rem;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: ${DarkColor};
  transition: color 0.3s ease;

  &:hover {
    color: ${BlueColor};
  }
`;

const Menu = styled.ul`
  justify-content: flex-end;
  display: flex;
  gap: 20px;
  list-style: none;
  width: 50%;

  @media (max-width: 550px) {
    font-size: 0.9rem;
  }

  @media (max-width: 420px) {
    width: auto;
  }
`;

const MenuItem = styled.li``;

export const Navbar = ({ categoriesArray, bookCategory }) => {
  // const randomIndex = Math.floor(Math.random() * categoriesArray?.length);
  // const randomCategory = bookCategory
  //   ? bookCategory
  //   : categoriesArray && categoriesArray[randomIndex].list_name_encoded;

  return (
    <Container>
      <Wrapper>
        <MenuLink to="/">
          <Logo>NytBest</Logo>
        </MenuLink>
        <Menu>
          <MenuItem>
            <MenuLink to="/">Home</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/bestsellers">Bestsellers</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/search">Search</MenuLink>
          </MenuItem>
        </Menu>
      </Wrapper>
    </Container>
  );
};

{
  /* <MenuLink
  to={
    categoriesArray || bookCategory
      ? `/${randomCategory}`
      : "/hardcover-fiction"
  }
>
  Bestsellers
</MenuLink>; */
}
