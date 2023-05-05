import React, { useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { BlueColor, DarkColor } from "../../variables";

const Container = styled.div`
  text-align: center;
  margin: 55px auto;
  max-width: 1920px;
`;

const MainHeader = styled.h1``;

const Tagline = styled.h3`
  margin: 15px 0 30px;
`;

const AmazonLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  transition: color 0.3s ease;

  &:hover {
    color: ${BlueColor};
  }
`;

const BookLink = styled(Link)`
  text-decoration: none;
  color: ${DarkColor};
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    margin-right: 10px;
    width: 80px;
    object-fit: cover;
    overflow: hidden;
  }

  ${(props) => props.primaryisbn === "error" && `pointer-events: none;`}

  @media (max-width: 552px) {
    flex-direction: column;
    text-align: center;

    img {
      width: 40px;
      margin-right: 0;
    }
  }

  @media (max-width: 369px) {
    font-size: 0.75rem;
  }
`;

const StyledTableCell = styled(TableCell)`
  @media (max-width: 371px) {
    &&.css-1ex1afd-MuiTableCell-root {
      padding: 16px 0;
    }

    &&.css-1yhpg23-MuiTableCell-root {
      padding: 16px 0;
    }
  }
`;

export const CategoryRanking = ({
  books,
  categoryId,
  categoryName,
  categoryDate,
  windowWidth,
}) => {
  const dateStr = categoryDate;
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  const [bookImages, setBookImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  // const fetchBookImage = async (isbn) => {
  //   try {
  //     const cachedImage = sessionStorage.getItem(isbn);
  //     if (cachedImage) {
  //       return cachedImage;
  //     } else {
  //       const response = await fetch(
  //         `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  //       );
  //       if (response.status === 429) {
  //         return null;
  //       }
  //       const data = await response.json();
  //       if (data.items && data.items[0]) {
  //         const imageLinks = data.items[0]?.volumeInfo.imageLinks;
  //         if (imageLinks) {
  //           const image = imageLinks.thumbnail;
  //           sessionStorage.setItem(isbn, image);
  //           return image;
  //         }
  //       }
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchBookImages = async () => {
  //     const newBookImages = {};
  //     for (const book of books) {
  //       let isbn;
  //       if (
  //         book.primary_isbn10 &&
  //         book.primary_isbn10 !== "None"
  //       ) {
  //         isbn = book.primary_isbn10;
  //       } else if (book.isbns[0]?.isbn10) {
  //         isbn = book.isbns[0].isbn10;
  //       } else {
  //         isbn = book.isbns[1]?.isbn10;
  //       }
  //       let image = await fetchBookImage(isbn);

  //       if (!image && book.isbns[1]) {
  //         image = await fetchBookImage(book.isbns[1].isbn10);
  //         book.book_details[0].primary_isbn10 = book.isbns[1].isbn10;
  //         setReload(true);
  //       }
  //       newBookImages[isbn] = image;
  //     }
  //     setBookImages(newBookImages);
  //     setLoading(false);
  //   };

  //   setReload(false);
  //   fetchBookImages();
  // }, [books, reload]);

  return (
    <Container>
      <MainHeader>{categoryName} Bestsellers Ranking</MainHeader>
      {!isNaN(date) && <Tagline>for {formattedDate}</Tagline>}

      <TableContainer component={Paper} sx={{ width: "90%", margin: "0 auto" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">Book</TableCell>
              <TableCell align="center">Last Week's Rank</TableCell>
              <TableCell align="center">Total Weeks in Rank</TableCell>
              {windowWidth > 462 && (
                <TableCell align="center">Link on Amazon</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((row, index) => {
              let primaryIsbn;

              // if (
              //   row.book_details[0].primary_isbn10 &&
              //   row.book_details[0].primary_isbn10 !== "None"
              // ) {
              //   primaryIsbn = row.book_details[0].primary_isbn10;
              // } else if (row.isbns[0] && row.isbns[0].isbn10) {
              //   primaryIsbn = row.isbns[0].isbn10;
              // } else if (row.isbns[1] && row.isbns[1].isbn10) {
              //   primaryIsbn = row.isbns[1].isbn10;
              // } else {
              //   primaryIsbn = "error";
              // }
              //////////////////////////////////////////////////////
              if (row.primary_isbn10 && row.primary_isbn10 !== "None") {
                primaryIsbn = row.primary_isbn10;
              } else if (row.isbns[0] && row.isbns[0].isbn10) {
                primaryIsbn = row.isbns[0].isbn10;
              } else if (row.isbns[1] && row.isbns[1].isbn10) {
                primaryIsbn = row.isbns[1].isbn10;
              } else {
                primaryIsbn = "error";
              }
              /////////////////////////////////////////////////////
              return (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row" align="center">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>
                    <BookLink
                      to={`/nytbest/${categoryId}/${primaryIsbn}`}
                      primaryisbn={primaryIsbn}
                    >
                      {/* {loading ? (
                        <span
                          style={{
                            width: "75px",
                            textAlign: "center",
                            fontSize: "0.8rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Loading book cover...
                        </span>
                      ) : bookImages[primaryIsbn] !== undefined ? ( */}
                      <img
                        // src={bookImages[primaryIsbn]}
                        src={row.book_image}
                        alt={row.title}
                        id="coverImg"
                      />
                      {/* ) : (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"
                          alt={row.title}
                        />
                      )} */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        {row.title}
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "#707070",
                            marginTop: "5px",
                          }}
                        >
                          {row.contributor}
                        </span>
                      </div>
                    </BookLink>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.rank_last_week === 0 ? "NEW" : row.rank_last_week}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.weeks_on_list === 0 ? "N/A" : row.weeks_on_list}
                  </StyledTableCell>
                  {windowWidth > 462 && (
                    <TableCell align="center">
                      <AmazonLink to={row.amazon_product_url} target="_blank">
                        {windowWidth >= 560 ? "Buy" : ""}{" "}
                        <OpenInNewIcon style={{ fontSize: "1rem" }} />
                      </AmazonLink>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
