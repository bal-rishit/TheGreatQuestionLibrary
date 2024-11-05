import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const QuestionCard = styled.div`
  background-color: ${(props) => (props.isSelected ? '#007acc' : '#054d72')};
  border-radius: 10px;
  overflow: hidden;
  width: 23%;
  margin-bottom: 20px;
  color: white;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Ensures bottom content stays at the bottom
`;

const QuestionInfo = styled.div`
  padding: 15px;
  flex-grow: 1; // Makes the content take up available space
  display: flex;
  flex-direction: column;
`;

const QuestionStream = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: #ffde7d;
`;

const QuestionTopic = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  color: white;
`;

const QuestionDescription = styled.p`
  font-size: 0.9rem;
  margin: 10px 0;
  color: #f0f0f0;
  flex-grow: 1; // Pushes the bottom section down
`;

const BottomSection = styled.div`
  padding: 10px 15px;
  background-color: #03648d;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const AuthorName = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: #f0f0f0;
  margin: 0;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
`;

const ExploreButton = styled(Link)`
  background-color: #ff6600;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e65c00;
  }
`;



const QuestionCards = ({ item, isSelected, onClick }) => {
  const[username, setUsername] = useState("loading...");
  useEffect(() => {
    // Fetch username from the server on component mount
    const fetchUsername = async () => {
      try {
        const res = await publicRequest.get(`users/finds/${item.userId}`, { withCredentials: true });
        setUsername(res.data.username);
      } catch (err) {
        console.error("Failed to fetch user info: ", err);
      }
    };
    fetchUsername();
  }, [item.userId]);


  const navigate = useNavigate(); // Initialize useNavigate
  const handleRedirect = (id) => {
    navigate(`/Author/${id}`);
  };

  return (
    <QuestionCard isSelected={isSelected} onClick={onClick}>
      <QuestionInfo>
        <QuestionStream>{item.stream}</QuestionStream>
        <QuestionTopic>{item.topic}</QuestionTopic>
        <QuestionDescription>{item.question}</QuestionDescription>
      </QuestionInfo>
      <BottomSection>
        <AuthorSection onClick={() => handleRedirect(item.userId)}>
          <StyledAvatar src={item.authorAvatar} alt={item.authorName} />
          <AuthorName>{username}</AuthorName>
        </AuthorSection>
        <ExploreButton to={`/Question/${item._id}`}>
          More Info
        </ExploreButton>
      </BottomSection>
    </QuestionCard>
  );
};

export default QuestionCards;
