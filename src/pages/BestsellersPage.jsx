import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Intro } from "../components/Intro";
import { Navbar } from "../components/Navbar";
import { SingleBestseller } from "../components/SingleBestseller";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const PageHeader = styled.h1`
  text-align: center;
  padding: 50px 0 20px;

  @media(max-width: 400px) {
    font-size: 1.6rem;
  }
`;

const PageTagline = styled.h3`
  text-align: center;
  padding-bottom: 20px;

  @media(max-width: 400px) {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  padding: 30px 0 60px;
  flex-grow: 1;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 60px;
`;

export const BestsellersPage = () => {
  const [booksList, setBooksList] = useState();
  const [listDate, setListDate] = useState();

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY;

    const getBooksList = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${API_KEY}`
        );
        setBooksList(response.data.results.lists);

        const dateStr = response.data.results.published_date;
        const date = new Date(dateStr);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-GB", options);

        setListDate(formattedDate);
        sessionStorage.setItem(
          "bestsellers",
          JSON.stringify(response.data.results.lists)
        );
        sessionStorage.setItem(
          "bestsellersDate",
          formattedDate
        );
      } catch (error) {
        console.log(error);
      }
    };

    const storedBooks = sessionStorage.getItem("bestsellers");
    const storedDate = sessionStorage.getItem("bestsellersDate");
    if (storedBooks && storedDate) {
      setBooksList(JSON.parse(storedBooks));
      setListDate(storedDate);
    } else {
      getBooksList();
    }
  }, []);

  return (
    <Container>
      <Navbar />
      <Intro info="info" />
      <PageHeader>Top New York Times Bestsellers</PageHeader>
      {listDate && <PageTagline>for {listDate}</PageTagline>}
      <Wrapper>
        {booksList?.map((book) => (
          <SingleBestseller
            key={book.list_id}
            categoryName={book.list_name}
            categoryNameUrl={book.list_name_encoded}
            bookImg={book.books[0].book_image}
            bookTitle={book.books[0].title}
            bookAuthor={book.books[0].author}
            isbn={book.books[0].primary_isbn10}
          />
        ))}
      </Wrapper>
      <Footer />
    </Container>
  );
};
