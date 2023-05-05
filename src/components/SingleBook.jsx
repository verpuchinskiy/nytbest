import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BlueColor, YellowColor } from "../../variables";

const Container = styled.div``;

const Wrapper = styled.div`
  background-color: ${YellowColor};
  padding: 30px 0;

  @media(max-width: 500px) {
    padding: 10px 0 30px;
  }
`;

const MainInfo = styled.div`
  max-width: 1920px;
  display: flex;
  justify-content: center;
  gap: 160px;
  margin: 0 auto;
  padding: 0 30px;

  @media (max-width: 1100px) {
    gap: 80px;
  }

  @media (max-width: 600px) {
    gap: 40px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1.5;
  text-align: right;

  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 500px) {
    width: 300px;
    margin: 0 auto;
    align-items: center;
  }

  @media (max-width: 360px) {
    width: 220px;
  }
`;

const BookImg = styled.img`
  width: 220px;

  @media (max-width: 750px) {
    width: 180px;
  }

  @media (max-width: 500px) {
    width: 160px;
  }
`;

const BookTitle = styled.h1`
  color: ${BlueColor};
  line-height: 2.2rem;

  @media (max-width: 750px) {
    font-size: 1.6rem;
  }

  @media (max-width: 500px) {
    text-align: center;
    line-height: 2rem;
  }
`;

const Author = styled.h3`
  margin: 8px 0 30px;
  font-weight: 500;
  color: #5a5a5a;

  @media (max-width: 750px) {
    font-size: 1rem;
    margin: 8px 0 20px;
  }
`;

const Property = styled.p`
  margin: 5px 0;
  color: #303030;
  span {
    font-weight: 500;
    color: black;
  }

  @media (max-width: 750px) {
    font-size: 0.8rem;
  }
`;

const IsbnBlock = styled.span`
  display: block;
  font-size: 0.8rem;
  margin: 5px 0;

  @media (max-width: 750px) {
    font-size: 0.6rem;
  }
`;

const GoogleBooksBtn = styled(Link)`
  text-decoration: none;
  margin-top: 20px;
  background-color: ${BlueColor};
  padding: 15px;
  border-radius: 16px;
  color: white;
  width: fit-content;

  @media (max-width: 750px) {
    font-size: 0.8rem;
    padding: 12px;
    border-radius: 10px;
  }

  @media (max-width: 500px) {
    font-size: 0.65rem;
    padding: 10px;
    border-radius: 8px;
  }
`;

const DescriptionHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;

  @media (max-width: 750px) {
    font-size: 1.3rem;
  }
`;

const Description = styled.p`
  max-width: 1920px;
  margin: 0 auto;
  padding: 40px 20%;
  line-height: 1.4rem;

  @media (max-width: 1100px) {
    padding: 40px 10%;
  }

  @media (max-width: 750px) {
    font-size: 0.8rem;
    line-height: 1.3rem;
  }
`;

export const SingleBook = ({ isbn, bookInfo }) => {
  const [imageSrc, setImageSrc] = useState(
    `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
  );
  const [bookInfoLoaded, setBookInfoLoaded] = useState(false);
  const [formattedDescription, setFormattedDescription] = useState([]);

  useEffect(() => {
    if (bookInfo) {
      setBookInfoLoaded(true);
      const sentences = bookInfo?.description?.split(/\. (?=[A-Z])/g);
      const paragraphSize = 3;
      const paragraphs = [];

      if (sentences) {
        while (sentences.length) {
          const paragraph = sentences.splice(0, paragraphSize).join(". ");
          paragraphs.push(paragraph);
        }

        const lastParagraphIndex = paragraphs.length - 1;
        paragraphs[lastParagraphIndex] = paragraphs[lastParagraphIndex].slice(
          0,
          -1
        );
        setFormattedDescription(paragraphs);
      }
    }
  }, [bookInfo]);

  const handleLoad = (event) => {
    const { naturalWidth } = event.target;
    if (naturalWidth <= 1) {
      if (!bookInfo.imageLinks?.thumbnail) {
        setImageSrc(
          "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"
        );
      } else {
        setImageSrc(bookInfo.imageLinks.thumbnail);
      }
    }
    // console.log(bookInfo);
  };

  return (
    <Container>
      <Wrapper>
        <MainInfo>
          <Left>
            {bookInfoLoaded && <BookImg src={imageSrc} onLoad={handleLoad} />}
          </Left>
          <Right>
            <BookTitle>{bookInfo?.title}</BookTitle>
            <Author>{bookInfo?.authors && bookInfo?.authors.join(", ")}</Author>
            <Property>
              {bookInfo?.categories && (
                <>
                  <span>Genre: </span>
                  {bookInfo?.categories && bookInfo?.categories.join(", ")}
                </>
              )}
            </Property>
            <Property>
              {bookInfo?.pageCount !== 0 && bookInfo?.pageCount && (
                <>
                  <span>Pages:</span> {bookInfo?.pageCount}
                </>
              )}
            </Property>
            <Property>
              {bookInfo?.publisher && (
                <>
                  <span>Publisher:</span> "{bookInfo?.publisher}"
                </>
              )}
            </Property>
            <Property>
              {bookInfo?.industryIdentifiers && (
                <>
                  {bookInfo?.industryIdentifiers.map((isbn) => (
                    <IsbnBlock key={isbn.identifier}>
                      <span>{isbn.type.replace(/_/g, "")}:</span>{" "}
                      <span style={{ fontWeight: "400" }}>
                        {isbn.identifier}
                      </span>
                      <br />
                    </IsbnBlock>
                  ))}
                </>
              )}
            </Property>
            {bookInfo?.previewLink && (
              <GoogleBooksBtn to={bookInfo?.previewLink} target="_blank">
                Preview in Google Books
              </GoogleBooksBtn>
            )}
          </Right>
        </MainInfo>
      </Wrapper>
      <Description>
        {bookInfo?.description && (
          <DescriptionHeader>Book Description</DescriptionHeader>
        )}
        {formattedDescription.map((paragraph, index) => (
          <React.Fragment key={index}>
            <span>{paragraph}.</span>
            <br />
            <br />
          </React.Fragment>
        ))}
      </Description>
    </Container>
  );
};
