import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const QuestionCard = styled.div`
  background-color: #054d72;
  border-radius: 10px;
  overflow: hidden;
  width: 23%;
  margin-bottom: 20px;
  color: white;
  text-align: left;
`;

const QuestionImage = styled.img`
  width: 100%;
  height: auto;
`;

const QuestionInfo = styled.div`
  padding: 10px;
`;

const QuestionStream = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const QuestionDescription = styled.p`
  font-size: 0.9rem;
  margin: 10px 0;
`;

const QuestionTopic = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
`;

const ExploreButton = styled.button`
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
`;

// const ExploreButton = styled.button`
//   background-color: #0066cc;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 1rem;
//   margin-top: 20px;
// `;

const QuestionCards = ({ item }) => {
  return (
      <QuestionCard key={item._id}>
        {/* <ProductImage src={item.img} alt={item.name} /> */}
        <QuestionInfo>
          <QuestionStream>{item.stream}</QuestionStream>
          <QuestionTopic>{item.topic}</QuestionTopic>
          <QuestionDescription>
            {item.question}
          </QuestionDescription>      
          <Link to={`/Question/${item._id}`}>
            <ExploreButton>More Info</ExploreButton>
          </Link>
        </QuestionInfo>
      </QuestionCard>
  );
};

export default QuestionCards;
