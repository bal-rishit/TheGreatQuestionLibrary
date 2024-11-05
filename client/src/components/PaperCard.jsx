import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const PaperTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const PaperLink = styled.a`
  margin: 10px 0;
  font-size: 18px;
  color: #0066b2;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #004a8b;
  }
`;

const PaperCard = ({ key, paperTitle, paperLink}) => {
  return (
    <CardContainer>
      <PaperTitle>{paperTitle}</PaperTitle>
      <PaperLink href={paperLink} target="_blank" rel="noopener noreferrer">
        View Paper
      </PaperLink>
    </CardContainer>
  );
};

export default PaperCard;
