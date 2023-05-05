import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SingleCategory } from "./SingleCategory";
import { bgImagesArray } from "../../data";
import { Link } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  margin: 55px auto;
  max-width: 1920px;
`;

const Header = styled.h2`
  line-height: 3rem;
`;

const Tagline = styled.p`
  margin-bottom: 40px;
`;

const CategoriesBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const Categories = ({ categoriesArray }) => {
  // const [categoriesArray, setCategoriesArray] = useState();

  // useEffect(() => {
  //   const API_KEY = import.meta.env.VITE_APP_API_KEY;

  //   const storedCategoriesArray = sessionStorage.getItem("categoriesArray");

  //   if (storedCategoriesArray) {
  //     setCategoriesArray(JSON.parse(storedCategoriesArray));
  //   } else {
  //     axios
  //       .get(
  //         `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`
  //       )
  //       .then((response) => {
  //         sessionStorage.setItem(
  //           "categoriesArray",
  //           JSON.stringify(response.data.results)
  //         );
  //         setCategoriesArray(response.data.results);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         if (err.response && err.response.status === 429) {
  //           toast(
  //             `Too many actions. Our site needs to rest for 60 seconds. The page will be reloaded automatically.`
  //           );
  //           timeoutId = setTimeout(() => {
  //             getBooksList();
  //           }, 60000);
  //         } else {
  //           setError(err);
  //           sessionStorage.removeItem(categoryId);
  //         }
  //       });
  //   }
  // }, []);

  const mergedCategoriesArray = categoriesArray
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.newest_published_date) - new Date(a.newest_published_date)
    )
    .map((category) => {
      const { name, bgImage } =
        bgImagesArray.find((data) => data.name === category.list_name) || {};
      return { ...category, bgImage };
    });

  return (
    <Container>
      <Header>Are you interested in certain literary genres?</Header>
      <Tagline>Select the appropriate category:</Tagline>
      {categoriesArray && (
        <CategoriesBlock>
          {mergedCategoriesArray.map((category) => (
            <Link
              to={`/nytbest/${category.list_name_encoded}`}
              key={category.list_name}
              style={{ textDecoration: "none" }}
            >
              <SingleCategory
                name={category.display_name}
                key={category.list_name}
                bgImage={category.bgImage}
                newest={category.newest_published_date}
                oldest={category.oldest_published_date}
              />
            </Link>
          ))}
        </CategoriesBlock>
      )}
    </Container>
  );
};
