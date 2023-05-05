import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { BlueColor } from "../../variables";
import { Footer } from "../components/Footer";
import { Intro } from "../components/Intro";
import { Navbar } from "../components/Navbar";
import { SearchPagination } from "../components/SearchPagination";
import { SearchResults } from "../components/SearchResults";
import CircularProgress from "@mui/joy/CircularProgress";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  width: 1080px;

  @media (max-width: 1100px) {
    width: 100vw;
  }
`;

const SearchField = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 50px;

  @media (max-width: 850px) {
    /* flex-direction: column; */
    flex-wrap: wrap;
    gap: 40px;
  }
`;

const SearchSection = styled.div``;

const SearchTitle = styled.h3`
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  -moz-appearance: textfield;

  padding: 16px 10px;
  font-size: 1rem;
  width: 200px;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SearchBtn = styled.button`
  margin: 0 auto;
  display: block;
  padding: 14px 20px;
  border: none;
  border-radius: 16px;
  background-color: ${BlueColor};
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:active {
    background-color: #1669bd;
    transform: translateY(2px);
  }
`;

const SearchPages = styled.div`
  text-align: center;
  margin-bottom: 40px;
  width: 1080px;

  @media (max-width: 1100px) {
    width: 100vw;
  }
`;

export const SearchPage = () => {
  const [results, setResults] = useState();

  const [author, setAuthor] = useState(
    sessionStorage.getItem("author") ? sessionStorage.getItem("author") : ""
  );
  const [book, setBook] = useState(
    sessionStorage.getItem("book") ? sessionStorage.getItem("book") : ""
  );
  const [isbn, setIsbn] = useState(
    sessionStorage.getItem("isbn") ? sessionStorage.getItem("isbn") : ""
  );

  const [searchClicked, setSearchClicked] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    const offset = (currentPage - 1) * 20;

    let timeoutId;

    const getResults = async () => {
      let response;
      try {
        setIsLoading(true);
        const storedAuthor = sessionStorage.getItem("author");
        const storedBook = sessionStorage.getItem("book");
        const storedIsbn = sessionStorage.getItem("isbn");

        if (book === "" && isbn === "" && storedAuthor !== "") {
          response = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${API_KEY}&author=${storedAuthor}&offset=${offset}`
          );
        } else if (author === "" && isbn === "" && storedBook !== "") {
          response = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${API_KEY}&title=${storedBook}&offset=${offset}`
          );
        } else if (author === "" && book === "" && storedIsbn !== "") {
          response = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${API_KEY}&isbn=${storedIsbn}`
          );
        }
        setIsLoading(false);
        setError(undefined);
        setResults(response.data);
        sessionStorage.setItem("searchResults", JSON.stringify(response.data));
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 429) {
          toast.warn(
            "Too many actions. Our site needs to rest for 60 seconds. The page will be reloaded automatically."
          );
          timeoutId = setTimeout(() => {
            getResults();
          }, 60000);
        } else {
          setError(err);
          sessionStorage.removeItem("searchResults");
        }
      }
    };

    if (searchClicked) {
      //   sessionStorage.clear();
      getResults();
      setSearchClicked(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchClicked, currentPage, error]);

  useEffect(() => {
    const storedBooks = sessionStorage.getItem("searchResults");
    if (storedBooks) {
      setResults(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("author", author);
    sessionStorage.setItem("book", book);
    sessionStorage.setItem("isbn", isbn);
    setCurrentPage(1);
  }, [author, book, isbn]);

  const handleSearchClick = (searchField) => {
    if (searchField === "author") {
      setBook("");
      setIsbn("");
    } else if (searchField === "book") {
      setAuthor("");
      setIsbn("");
    } else if (searchField === "isbn") {
      setAuthor("");
      setBook("");
    }
    setReload(true);
  };

  const isSearchDisabled = author === "" && book === "" && isbn === "";

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchClicked(true);
    setReload(false);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      setSearchClicked(true);
    }
    if (event.keyCode === 9) {
      event.preventDefault();
    }
  };

  return (
    <Container>
      <Navbar />
      <Intro info="search" />
      <Wrapper>
        <ToastContainer
          autoClose={60000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
        <SearchField>
          <SearchSection>
            <SearchTitle>Author Name</SearchTitle>
            <SearchInput
              type="text"
              placeholder="E.g.: Haruki Murakami"
              value={author}
              onClick={() => {
                handleSearchClick("author");
              }}
              onChange={(e) => setAuthor(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </SearchSection>
          <SearchSection>
            <SearchTitle>Book Title</SearchTitle>
            <SearchInput
              type="text"
              placeholder="E.g.: Kafka on the Shore"
              value={book}
              onClick={() => handleSearchClick("book")}
              onChange={(e) => setBook(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </SearchSection>
          <SearchSection>
            <SearchTitle>ISBN Number</SearchTitle>
            <SearchInput
              type="text"
              placeholder="E.g.: 1400079276"
              value={isbn}
              onClick={() => handleSearchClick("isbn")}
              onChange={(e) => setIsbn(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </SearchSection>
        </SearchField>
        <SearchBtn
          onClick={() => setSearchClicked(true)}
          disabled={isSearchDisabled}
        >
          Search
        </SearchBtn>
        {isLoading && !error ? (
          <CircularProgress
            variant="soft"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 170px)",
              width: "100%",
            }}
          />
        ) : results && results.results.length > 0 ? (
          <SearchResults results={results.results} />
        ) : (
          <p></p>
        )}
        {results?.num_results > 20 && (
          <SearchPages>
            <SearchPagination
              totalResults={results?.num_results}
              paginate={paginate}
              reload={reload}
            />
          </SearchPages>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};
