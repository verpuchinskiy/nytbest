import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryRanking } from "../components/CategoryRanking";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import CircularProgress from "@mui/joy/CircularProgress";
import styled from "styled-components";
import { CategoriesVertical } from "../components/CategoriesVertical";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Intro } from "../components/Intro";

const Container = styled.div`
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 78px);
  margin: 0 auto;
`;

const Content = styled.div`
  flex-grow: 1;
  max-width: 1920px;
  margin: 0 auto;
`;

const BlockWithTable = styled.div`
  display: flex;
  justify-content: center;
`;

const CategoryTable = styled.div`
  flex: 10;
`;

const CategoriesLeft = styled.div`
  flex: 3;

  @media (max-width: 830px) {
    flex: 2;
  }
`;

const CategoriesVerticalList = styled.div`
  margin-top: 160px;

  @media (max-width: 1100px) {
    margin-top: 40px;
  }
`;
const CategoryTableRight = styled.div`
  flex: 3;
  margin-top: 160px;
  padding-right: 20px;

  @media (max-width: 1100px) {
    margin-top: 140px;
    padding-left: 20px;
  }

  @media (max-width: 830px) {
    padding-right: 0;
  }

  @media (max-width: 751px) {
    margin: 0;
    margin-top: -20px;
    width: 100vw;
    text-align: center;
    padding-left: 0;
  }
`;

const Header = styled.h4`
  margin-bottom: 20px;

  @media (max-width: 830px) {
    font-size: 0.8rem;
    margin-bottom: 10px;
    line-height: 1rem;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 20px 0;
  font-size: 0.95rem;
  text-align: center;

  @media (max-width: 830px) {
    font-size: 0.7rem;
    padding: 10px 0;
  }
`;

const FooterWrapper = styled.div``;

export const CategoryPage = () => {
  const { categoryId } = useParams();

  const [booksArray, setBooksArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [categoriesArray, setCategoriesArray] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [categoryDate, setCategoryDate] = useState(
    sessionStorage.getItem(`${categoryId}_date`)
      ? sessionStorage.getItem(`${categoryId}_date`)
      : "current"
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    let timeoutId;
    const API_KEY = import.meta.env.VITE_APP_API_KEY;

    const getBooksList = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/${categoryDate}/${categoryId}.json?api-key=${API_KEY}`
          // `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${API_KEY}&list=${categoryId}`
        );
        setIsLoading(false);
        setError(undefined);
        setBooksArray(response.data.results.books);
        sessionStorage.setItem(
          categoryId,
          JSON.stringify(response.data.results.books)
        );
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 429) {
          toast.warn(
            "Too many actions. Our site needs to rest for 60 seconds. The page will be reloaded automatically."
          );
          timeoutId = setTimeout(() => {
            getBooksList();
          }, 60000);
        } else {
          setError(err);
          sessionStorage.removeItem(categoryId);
        }
      }
    };

    const storedBooks = sessionStorage.getItem(categoryId);
    if (storedBooks) {
      setBooksArray(JSON.parse(storedBooks));
    } else if (!error) {
      getBooksList();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [categoryId, categoryDate, error]);

  useEffect(() => {
    if (selectedDate) {
      sessionStorage.removeItem(categoryId);
      const newCategoryDate = new Date(selectedDate).toISOString().slice(0, 10);
      setCategoryDate(newCategoryDate);
      sessionStorage.setItem(`${categoryId}_date`, newCategoryDate);
    }

    if (selectedDate === null) {
      sessionStorage.removeItem(categoryId);
      setCategoryDate("current");
    }
  }, [selectedDate]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem(`${categoryId}_date`);
      sessionStorage.removeItem(categoryId);
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        sessionStorage.removeItem(`${categoryId}_date`);
        sessionStorage.removeItem(categoryId);
      });
    };
  }, [categoryId]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Navbar bookCategory={categoryId} />
      <Intro info="info" />
      <Wrapper>
        <ToastContainer
          autoClose={60000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
        <Content>
          {error?.message === "Request failed with status code 429" &&
          booksArray.length === 0 ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 390px)",
              }}
            >
              Too many requests. Please wait a minute and retry.
            </p>
          ) : (
            ""
          )}
          {isLoading && !error ? (
            <CircularProgress
              variant="soft"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 170px)",
              }}
            />
          ) : (
            <BlockWithTable>
              {windowWidth >= 752 && (
                <CategoriesLeft>
                  {windowWidth <= 1100 && windowWidth >= 752 && (
                    <CategoryTableRight>
                      <Header>Choose Ranking Date:</Header>
                      {categoriesArray && categoriesArray.length > 0 && (
                        <StyledDatePicker
                          selected={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                          }}
                          minDate={
                            new Date(
                              categoriesArray?.find(
                                (category) =>
                                  category.list_name_encoded === categoryId
                              )?.oldest_published_date
                            )
                          }
                          maxDate={
                            new Date(
                              categoriesArray?.find(
                                (category) =>
                                  category.list_name_encoded === categoryId
                              )?.newest_published_date
                            )
                          }
                          placeholderText="Select a date"
                        />
                      )}
                    </CategoryTableRight>
                  )}
                  <CategoriesVerticalList
                    onClick={() => {
                      setSelectedDate(null);
                    }}
                  >
                    <CategoriesVertical />
                  </CategoriesVerticalList>
                </CategoriesLeft>
              )}
              <CategoryTable>
                <CategoryRanking
                  books={booksArray}
                  categoryId={categoryId}
                  categoryName={
                    categoriesArray?.find(
                      (category) => category.list_name_encoded === categoryId
                    )?.display_name
                  }
                  categoryDate={
                    categoryDate === "current"
                      ? categoriesArray?.find(
                          (category) =>
                            category.list_name_encoded === categoryId
                        )?.newest_published_date
                      : categoryDate
                  }
                  windowWidth={windowWidth}
                />
              </CategoryTable>
              {windowWidth > 1100 && (
                <CategoryTableRight>
                  <Header>Choose Ranking Date:</Header>
                  {categoriesArray && categoriesArray.length > 0 && (
                    <StyledDatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                      }}
                      minDate={
                        new Date(
                          categoriesArray?.find(
                            (category) =>
                              category.list_name_encoded === categoryId
                          )?.oldest_published_date
                        )
                      }
                      maxDate={
                        new Date(
                          categoriesArray?.find(
                            (category) =>
                              category.list_name_encoded === categoryId
                          )?.newest_published_date
                        )
                      }
                      placeholderText="Select a date"
                    />
                  )}
                </CategoryTableRight>
              )}
            </BlockWithTable>
          )}
          {windowWidth < 752 && !isLoading && !error && (
            <>
              <CategoryTableRight>
                <Header>Choose Ranking Date:</Header>
                {categoriesArray && categoriesArray.length > 0 && (
                  <StyledDatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                    minDate={
                      new Date(
                        categoriesArray?.find(
                          (category) =>
                            category.list_name_encoded === categoryId
                        )?.oldest_published_date
                      )
                    }
                    maxDate={
                      new Date(
                        categoriesArray?.find(
                          (category) =>
                            category.list_name_encoded === categoryId
                        )?.newest_published_date
                      )
                    }
                    placeholderText="Select a date"
                  />
                )}
              </CategoryTableRight>
              <CategoriesVerticalList
                onClick={() => {
                  setSelectedDate(null);
                }}
              >
                <CategoriesVertical />
              </CategoriesVerticalList>
            </>
          )}
        </Content>
        <FooterWrapper>
          <Footer bookCategory={categoryId} />
        </FooterWrapper>
      </Wrapper>
    </Container>
  );
};
