import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BlueColor } from "../../variables";

const Container = styled.div`
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  height: fit-content;
  border-radius: 3px;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 360px;
  overflow: scroll;
  text-align: center;
`;

const CategoryName = styled.h4`
  line-height: 1.4rem;
  transition: color 0.3s ease;
  height: 45px;
  display: flex;
  align-items: center;

  &:hover {
    color: ${BlueColor};
  }
`;

const BookImg = styled.img`
  height: auto;
  width: 140px;
  margin: 14px 0;
`;

const BookTitle = styled.h4`
  margin-bottom: 6px;
  letter-spacing: 1px;
  line-height: 1.2rem;
`;

const BookAuthor = styled.p`
  font-size: 0.8rem;
  color: #606060;
  line-height: 0.9rem;
`;

const BookLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const SingleBestseller = ({
  categoryName,
  categoryNameUrl,
  bookImg,
  bookTitle,
  bookAuthor,
  isbn,
}) => {
  return (
    <Container>
      <BookLink to={`/nytbest/${categoryNameUrl}`}>
        <CategoryName>{categoryName}</CategoryName>
      </BookLink>
      <BookLink to={`/nytbest/${categoryNameUrl}/${isbn}`}>
        <BookImg src={bookImg} />
        <BookTitle>{bookTitle}</BookTitle>
        <BookAuthor>{bookAuthor}</BookAuthor>
      </BookLink>
    </Container>
  );
};
