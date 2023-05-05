import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BlueColor } from "../../variables";

const Container = styled.div``;

const Header = styled.h4`
  margin-left: 20px;

  @media (max-width: 830px) {
    font-size: 0.8rem;
  }

  @media (max-width: 751px) {
    text-align: center;
    margin-left: 0;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 20px 30px;
  font-size: 0.8rem;

  @media (max-width: 830px) {
    font-size: 0.7rem;
    margin: 20px 0 20px 20px;
  }

  @media (max-width: 751px) {
    column-count: 2;
    text-align: center;
    margin: 20px 30px;
  }

  @media (max-width: 500px) {
    column-count: 1;
  }
`;

const ListComponent = styled.li`
  margin: 20px 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${BlueColor};
  }

  @media (max-width: 751px) {
    &:first-child {
      margin-top: 0;
    }
  }
`;

export const CategoriesVertical = () => {
  const [categoriesArray, setCategoriesArray] = useState([]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY;

    const storedCategoriesArray = sessionStorage.getItem("categoriesArray");

    if (storedCategoriesArray) {
      setCategoriesArray(JSON.parse(storedCategoriesArray));
    } else {
      axios
        .get(
          `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`
        )
        .then((response) => {
          sessionStorage.setItem(
            "categoriesArray",
            JSON.stringify(response.data.results)
          );
          setCategoriesArray(response.data.results);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <Container>
      <Header>Literary Genres:</Header>
      <List>
        {categoriesArray
          .sort((a, b) => a.display_name.localeCompare(b.display_name))
          .map((category) => (
            <Link
              to={`/nytbest/${category.list_name_encoded}`}
              key={category.list_name}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListComponent>{category.display_name}</ListComponent>
            </Link>
          ))}
      </List>
    </Container>
  );
};
