import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SingleBook } from "../components/SingleBook";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Wrapper = styled.div`
  flex-grow: 1;
`;

export const BookPage = () => {
  const { bookId, categoryId } = useParams();

  const [bookInfo, setBookInfo] = useState();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getBookInfo = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${bookId}`
        );
        setBookInfo(response.data.items && response.data.items[0]?.volumeInfo);
        setNotFound(true);
      } catch (error) {
        console.log(error);
      }
    };

    getBookInfo();
  }, []);

  return (
    <Container>
      <Navbar bookCategory={categoryId} />
      <Wrapper>
        {bookInfo && <SingleBook isbn={bookId} bookInfo={bookInfo} />}
        {notFound && !bookInfo && (
          <p
            style={{
              width: "100vw",
              height: "calc(100vh - 174px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            The information about this book has not been found in the database.
          </p>
        )}
      </Wrapper>
      <Footer bookCategory={categoryId} />
    </Container>
  );
};
