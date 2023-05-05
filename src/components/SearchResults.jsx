import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BlueColor, YellowColor } from "../../variables";

const Container = styled.div`
  padding: 10px 20px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const SingleResult = styled.div`
  border: 1px solid ${YellowColor};
  box-shadow: 0px 0px 8px rgba(255, 227, 94);
  margin: 20px;
  padding: 20px 30px 30px;
  position: relative;

  @media (max-width: 1100px) {
    width: calc(100vw - 30%);
    margin: 20px auto;
  }

  @media (max-width: 370px) {
    width: calc(100vw - 40%);
    margin: 20px auto;
  }
`;

const BookTitle = styled.h3`
  color: ${BlueColor};
  padding: 10px 160px 10px 0;

  @media (max-width: 500px) {
    padding: 10px 10px 10px 0;
  }
`;

const BookAuthor = styled.p`
  color: gray;
  margin-bottom: 20px;
`;

const BookDescription = styled.p``;

const BookIsbn = styled.p`
  font-size: 0.8rem;
  position: absolute;
  top: 0;
  right: 0;
  padding: 30px;

  @media (max-width: 500px) {
    top: -20px;
    right: -20px;
    font-size: 0.6rem;
  }
`;

const HorizontalLine = styled.hr`
  border: none;
  height: 1px;
  background-color: black;
  opacity: 0.15;
  margin: 40px 0;
`;

const BookLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const HistoryBlock = styled.div`
  font-size: 0.75rem;
  margin-top: 25px;
`;

const HistoryEntry = styled.div`
  margin-top: 16px;
  line-height: 1rem;
`;

export const SearchResults = ({ results }) => {
  return (
    <Container>
      <HorizontalLine />
      <Header>Search Results</Header>
      {results.map((result) => {
        // Create an object to store the highest rank for each display_name
        const highestRanks = {};
        result.ranks_history.forEach((history_rank) => {
          const displayName = history_rank.display_name;
          const rank = history_rank.rank;
          if (!highestRanks[displayName] || rank < highestRanks[displayName]) {
            highestRanks[displayName] = rank;
          }
        });

        // Filter out any history_rank objects with a lower rank for the same display_name
        const uniqueRanks = result.ranks_history.filter(
          (history_rank, index, self) => {
            const displayName = history_rank.display_name;
            const rank = history_rank.rank;
            const highestRank = highestRanks[displayName];
            return (
              rank === highestRank &&
              self.findIndex(
                (h) => h.display_name === displayName && h.rank === rank
              ) === index
            );
          }
        );

        return (
          <SingleResult
            key={
              result.isbns[0]?.isbn10 ? result.isbns[0].isbn10 : result.title
            }
          >
            <BookTitle>
              {result.isbns &&
              result.isbns.length > 0 &&
              result.isbns[0].isbn10 ? (
                <BookLink to={`/search/${result.isbns[0].isbn10}`}>
                  {result.title}
                </BookLink>
              ) : (
                result.title
              )}
            </BookTitle>
            <BookAuthor>{result.author}</BookAuthor>
            {result.isbns &&
              result.isbns.length > 0 &&
              result.isbns[0].isbn10 && (
                <BookIsbn>ISBN: {result.isbns[0].isbn10}</BookIsbn>
              )}
            <BookDescription>{result.description}</BookDescription>
            <HistoryBlock>
              {uniqueRanks.length > 0 &&
                uniqueRanks.map((history_rank) => {
                  return (
                    <HistoryEntry
                      key={`${result.title}-${history_rank.display_name}-${history_rank.published_date}`}
                    >
                      Highest Rank: <i>{history_rank.rank}</i> <br /> Category:{" "}
                      <i>{history_rank.display_name}</i>
                    </HistoryEntry>
                  );
                })}
            </HistoryBlock>
          </SingleResult>
        );
      })}
    </Container>
  );
};
