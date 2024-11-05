import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from '../requestMethods';
import { FormControl, FormLabel } from "@mui/material";
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

// const ImgContainer = styled.div`
//   flex: 1;
// `;

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
  background-color: ${(props) => {
    if (props.issubmitted) {
      if (props.iscorrect){
        if(props.isselected) return 'darkgreen';  // Selected and correct
        else return 'lightgreen'; // Not selected but correct
      } 
      else{
        if(props.isselected) return 'red';       // Selected and incorrect
        else return 'gray';  // Not selected and incorrect
      } 
    } else {
      return props.isselected ? 'blue' : 'gray';
    }
  }};
  color: white;
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.issubmitted
        ? (props.iscorrect && props.isselected ? 'darkgreen' : 'darkgray')
        : (props.isselected ? 'darkblue' : 'darkgray')
    };
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

const ContainerInner = styled.div`
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

const ExplanationContainer = styled.div`
  flex: 1;
  margin-top: 20px;
  max-width: 600px; /* Set a max width */
`;

const ExplanationContent = styled.div`
  max-height: 200px; /* Height limit for scrolling */
  overflow-y: auto; /* Enables scrolling if content exceeds max height */
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  word-wrap: break-word; /* Ensures long words wrap to the next line */
  white-space: pre-wrap; /* Preserves line breaks and wraps text as needed */
`;


const ExplanationButton = styled.button`
  background-color: lightgray;
  color: #333;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-weight: bold;

  &:hover {
    background-color: #ddd;
  }
`;

// const ExplanationContent = styled.div`
//   max-height: 200px;
//   overflow-y: scroll;
//   background-color: #f9f9f9;
//   padding: 15px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   margin-top: 10px;
// `;

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const getCurrentQuestion = async () => {
      try {
        const res = await publicRequest.get("/submit/find/" + id, { withCredentials: true });
        setCurrentQuestion(res.data);
      } catch (err) {
        console.error("API call failed: ", err);
      }
    };
    getCurrentQuestion();
  }, [id]);

  const handleOptionClick = (optionKey) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [optionKey]: !prevState[optionKey], // Toggle the boolean state
    }));
  };

  const handleSubmit = async () => {
    try {
      // Fetch the correct options from the API
      const res = await publicRequest.get("/submit/find/" + id, { withCredentials: true });

      setIsSubmitted(true);

    } catch (err) {
      console.error("Error fetching correct answers", err);
    }

  };

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev);
    handleSubmit();
  };

  if (!currentQuestion.givenOptions) {
    return <p>Loading...</p>; // Show a loading state if givenOptions is not yet available
  }

  return (
    <Container>
      <Wrapper>
        {/* Explanation Section */}
        <ExplanationContainer>
            <ExplanationButton onClick={toggleExplanation}>
              {showExplanation ? "Hide Explanation" : "View Explanation"}
            </ExplanationButton>
            {showExplanation && (
              <ExplanationContent>
                {currentQuestion.explanation}
              </ExplanationContent>
            )}
          </ExplanationContainer>
        {/* <ImgContainer>
          Explanation
        </ImgContainer> */}
        
        <InfoContainer>
          <Stream>{currentQuestion.stream}</Stream>
          <Topic>{currentQuestion.topic}</Topic>
          <Question>{currentQuestion.question}</Question>
          <FormControlStyled component="fieldset">
            <FormLabelStyled component="legend">Options</FormLabelStyled>
            <ContainerInner>
              {Object.keys(selectedOption).map((optionKey, index) => (
                <OptionButton
                  key={index}
                  onClick={() => handleOptionClick(optionKey)}
                  isselected={selectedOption[optionKey]}
                  iscorrect={currentQuestion.selectedOptions[optionKey]}
                  issubmitted = {isSubmitted}
                >
                  {currentQuestion.givenOptions[optionKey]}
                </OptionButton>
              ))}
            </ContainerInner>
          </FormControlStyled>
          <ButtonContainer>
            <ButtonStyled onClick={handleSubmit}>Submit</ButtonStyled>
          </ButtonContainer>
        </InfoContainer>
        
      </Wrapper>

      {user ? <CommentSection id={id} /> : <div>Login to access Comment Section</div>}
    </Container>
  );
};

export default CurrentQuestion;
