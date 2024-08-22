import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {Button, FormControl, FormLabel } from "@mui/material";
import { mobile } from "../responsive";
import CommentSection from "../components/CommentSection";
import { useSelector } from "react-redux";


const Container = styled.div`
  background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Stream = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

const Topic = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: teal;
`;

const Question = styled.p`
  margin: 20px 0;
  color: #555;
  line-height: 1.6;
`;

const OptionButton = styled.button`
  background-color: ${(props) => 
    props.isselected ? 'blue' : 'gray'};
  color: white;
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isselected ? 'darkblue' : 'darkgray'};
  }
`;

const ButtonStyled = styled.button`
  padding: 15px 30px;
  border: none;
  background-color: teal;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: blue;
  }
`;
const Containerinner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FormControlStyled = styled(FormControl)`
  margin-bottom: 20px;
`;

const FormLabelStyled = styled(FormLabel)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;



const CurrentQuestion = () => {

  const user = useSelector((state) => state.user.currentUser);

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedOption, setSelectedOption] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const getCurrentQuestion = async () => {
      try {
        const res = await axios.get("https://thegreatquestionlibrary-1.onrender.com/api/submit/find/" + id);
        setCurrentQuestion(res.data);
      } catch (err) {
        console.error("API call failed: ", err);
      }
    };
    getCurrentQuestion();
  }, [id]);

  const handleOptionClick = (optionKey) => {
    setSelectedOption(prevState =>({
      ...prevState,
      [optionKey]: !prevState[optionKey], // Toggle the boolean state
    }));
  };

  const handleSubmit = () => {
    console.log("Selected Options:", selectedOption);
    
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  


  // Ensure `givenOptions` exists before rendering
  if (!currentQuestion.givenOptions) {
    return <p>Loading...</p>; // Show a loading state if `givenOptions` is not yet available
  }

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          {/* Uncomment the Image component if needed */}
          {/* <Image src={currentQuestion.img} /> */}
        </ImgContainer>
        <InfoContainer>
          <Stream>{currentQuestion.stream}</Stream>
          <Topic>{currentQuestion.topic}</Topic>
          <Question>{currentQuestion.question}</Question>
          <FormControlStyled component="fieldset">
            <FormLabelStyled component="legend">Options</FormLabelStyled>
            <Containerinner>
              <OptionButton
                variant="contained"
                onClick={() => handleOptionClick('option1')}
                isselected={selectedOption.option1}
              >
                {currentQuestion.givenOptions.option1}
              </OptionButton>
              <OptionButton
                variant="contained"
                onClick={() => handleOptionClick('option2')}
                isselected={selectedOption.option2}
              >
                {currentQuestion.givenOptions.option2}
              </OptionButton>
              <OptionButton
                variant="contained"
                onClick={() => handleOptionClick('option3')}
                isselected={selectedOption.option3}
              >
                {currentQuestion.givenOptions.option3}
              </OptionButton>
              <OptionButton
                variant="contained"
                onClick={() => handleOptionClick('option4')}
                isselected={selectedOption.option4}
              >
                {currentQuestion.givenOptions.option4}
              </OptionButton>
            </Containerinner>
          </FormControlStyled>
          <ButtonContainer>
            <ButtonStyled onClick={handleSubmit}>
              Submit
            </ButtonStyled>
          </ButtonContainer>
        </InfoContainer>
      </Wrapper>

      { user ? <CommentSection id={id} /> : <div>Login to access Comment Section</div> }
    </Container>
  );
};

export default CurrentQuestion;
