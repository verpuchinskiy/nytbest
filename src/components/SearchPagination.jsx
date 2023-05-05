import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BlueColor } from "../../variables";

const Container = styled.div`
  padding: 0 30px;
`;

const PageBtn = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid ${BlueColor};
  margin: 6px 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? BlueColor : "#e6e6e6")};
  }

  background-color: ${({ active }) => (active ? BlueColor : "white")};
  color: ${({ active }) => (active ? "white" : BlueColor)};
  ${({ active }) => active && "pointer-events: none;"}
`;

export const SearchPagination = ({ totalResults, paginate, reload }) => {
  const [activeBtn, setActiveBtn] = useState(
    parseInt(sessionStorage.getItem("activePage")) || 1
  );
  const pageNumbers = [];

  useEffect(() => {
    sessionStorage.setItem("activePage", activeBtn);
  }, [activeBtn]);

  useEffect(() => {
    if (reload) {
      setActiveBtn(1);
      sessionStorage.setItem("activePage", 1);
    }
  }, [reload]);

  for (let i = 1; i <= Math.ceil(totalResults / 20); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    paginate(number);
    setActiveBtn(number);
  };

  return (
    <Container>
      {pageNumbers.map((number) => (
        <PageBtn
          key={number}
          onClick={() => handleClick(number)}
          active={number === activeBtn}
        >
          {number}
        </PageBtn>
      ))}
    </Container>
  );
};
