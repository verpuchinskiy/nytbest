import axios from "axios";
import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export const Homepage = () => {
  const [categoriesArray, setCategoriesArray] = useState();

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
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Navbar categoriesArray={categoriesArray} />
      <Hero categoriesArray={categoriesArray} />
      <Categories categoriesArray={categoriesArray} />
      <Footer categoriesArray={categoriesArray} />
    </>
  );
};
