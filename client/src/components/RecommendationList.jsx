import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #003d5c;
  text-align: center;
`;

const Title = styled.p`
  color: white;
  margin-bottom: 20px;
  font-size: 45px; 
`;

const RecQuestionGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RecQuestionCard = styled.div`
  background-color: #054d72;
  border-radius: 10px;
  overflow: hidden;
  width: 23%;
  margin-bottom: 20px;
  color: white;
  text-align: left;
`;

const RecQuestionInfoImage = styled.img`
  width: 100%;
  height: auto;
`;

const RecQuestionInfo = styled.div`
  padding: 10px;
`;

const RecQuestionStream = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const RecQuestionTopic = styled.p`
  font-size: 0.9rem;
  margin: 10px 0;
`;

const RecQuestionQuestion = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
`;

const BuyButton = styled.button`
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
`;

const ExploreButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
`;

// Examples
const products = [
  {
    id: 1,
    stream: "Stream 1",
    topic: "Topic 1",
    question: "Question Description",
  },
  {
    id: 2,
    stream: "Stream 2",
    topic: "Topic 2",
    question: "Question Description",
  },
  {
    id: 3,
    stream: "Stream 3",
    topic: "Topic 3",
    question: "Question Description",
  },
  {
    id: 4,
    stream: "Stream 4",
    topic: "Topic 4",
    question: "Question Description",
  }
];

const RecommendationList = () => {
  return (
    <Container>
      <Title>Recommended Questions</Title>
      <RecQuestionGrid>
        {products.map((product) => (
          <RecQuestionCard key={product.id}>
            {/* <RecQuestionImage src={product.image} alt={product.name} /> */}
            <RecQuestionInfo>
              <RecQuestionStream>{product.stream}</RecQuestionStream>
              <RecQuestionTopic>{product.topic}</RecQuestionTopic>
              <RecQuestionQuestion>{product.question}</RecQuestionQuestion>
              <BuyButton>More Info</BuyButton>
            </RecQuestionInfo>
          </RecQuestionCard>
        ))}
      </RecQuestionGrid>
      <Link to="/Questions">
      <ExploreButton>Explore more &gt;&gt;</ExploreButton>
    </Link>
    </Container>
  );
};

export default RecommendationList;
