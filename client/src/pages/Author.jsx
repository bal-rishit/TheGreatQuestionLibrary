import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";
import QuestionCards from "../components/QuestionCards"; // Question card component
import PaperCard from "../components/PaperCard"; // Updated PaperCard component
import { publicRequest } from "../requestMethods";

const AuthorPageContainer = styled.div`
  padding: 40px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const AuthorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
`;

const AuthorInfo = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const AuthorBio = styled.p`
  font-size: 1rem;
  color: #555;
`;

const TabContainer = styled.div`
  margin-top: 30px;
  display: flex;
  border-bottom: 2px solid #007acc;
`;

const TabButton = styled.button`
  background: ${(props) => (props.active ? '#007acc' : '#e0e0e0')};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.1rem;
  color: white;
  transition: background 0.3s;
  &:hover {
    background: ${(props) => (props.active ? '#005f99' : '#c0c0c0')};
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const Author = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [author, setAuthor] = useState({});
  const [questions, setQuestions] = useState([]);
  const [papers, setPapers] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // 0 for Questions, 1 for Papers

  useEffect(() => {
    // Fetch the author's data, questions, and papers
    const fetchAuthorData = async () => {
      try {
        const authorRes = await publicRequest.get(`/users/finds/${id}`, { withCredentials: true });
        const questionsRes = await publicRequest.get(`/submit/author/questions/${id}`, { withCredentials: true });
        const papersRes = await publicRequest.get(`/submit/author/papers/${id}`, { withCredentials: true });

        setAuthor(authorRes.data);
        setQuestions(questionsRes.data);
        setPapers(papersRes.data);
      } catch (err) {
        console.error("Error fetching author data: ", err);
      }
    };

    fetchAuthorData();
  }, [id]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <AuthorPageContainer>
      <AuthorHeader>
        <Avatar alt={author.username} src={author.profileImageUrl} sx={{ width: 80, height: 80 }} />
        <AuthorInfo>
          <AuthorName>{author.username}</AuthorName>
          <AuthorBio>{author.bio}</AuthorBio>
        </AuthorInfo>
      </AuthorHeader>

      <TabContainer>
        <TabButton active={activeTab === 0} onClick={() => handleTabChange(0)}>Questions</TabButton>
        <TabButton active={activeTab === 1} onClick={() => handleTabChange(1)}>Papers</TabButton>
      </TabContainer>

      {activeTab === 0 && (
        <ItemsList>
          {questions.map((question, index) => (
            <QuestionCards key={index} item={question} />
          ))}
        </ItemsList>
      )}

      {activeTab === 1 && (
        <ItemsList>
          {papers.map((paper, index) => (
            <PaperCard
              key={index}
              paperTitle={paper.paperTitle}
              paperLink={paper.paperLink}
            />
          ))}
        </ItemsList>
      )}
    </AuthorPageContainer>
  );
};

export default Author;
