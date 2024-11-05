import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { publicRequest } from "../requestMethods";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));



export default function AddressForm() {
  const user = useSelector((state) => state.user.currentUser);
  const [selectedOptions, setSelectedOptions] = React.useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const [givenOptions, setGivenOptions] = React.useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const [stream, setStream] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [explanation, setExplanation] = React.useState("");

  const [questionarray, setQuestionarray] = React.useState([]);

  const handleCheckboxChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange = (event) => {
    setGivenOptions({
      ...givenOptions,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickNext = () => {
    setQuestionarray([
      ...questionarray,
      {
        userId: user._id,
        stream: stream,
        topic: topic,
        question: question,
        explanation: explanation,
        selectedOptions: selectedOptions,
        givenOptions : givenOptions
      }
    ]);
    // Reset all fields
    setStream("");
    setTopic("");
    setQuestion("");
    setExplanation("");
    setSelectedOptions({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    });
    setGivenOptions({
      option1 : "",
      option2 : "",
      option3 : "",
      option4 : "",
    });
  }

  React.useEffect(() => {
    console.log(questionarray);
    //window.location.reload();
  }, [questionarray]);

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async() => {
    
    // submitting...
    
    
    try {
        
        const res = await publicRequest.post("submit", {
          questionarray,
        }, { withCredentials: true });

        // Check if the response is successful
        if (res.status === 201) {
            // Redirect to the home page
            navigate('/Questions');
        }
    } catch (error) {
        console.error("Submission failed", error);
    }
    
  }


  

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="stream" required>
          Stream
        </FormLabel>
        <OutlinedInput
          id="stream"
          name="stream"
          type="text"
          placeholder="For eg: Science, Commerce, Arts"
          required
          value={stream} // Controlled component
          onChange={(e) => setStream(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="topic" required>
          Topic
        </FormLabel>
        <OutlinedInput
          id="topic"
          name="topic"
          type="text"
          placeholder="For eg: calculus, rotation, ionic equilibrium"
          required
          value={topic} // Controlled component
          onChange={(e) => setTopic(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel
          htmlFor="question"
          required
          style={{ fontSize: '1.5em', lineHeight: '2em' }} // Increased label size
        >
          Question
        </FormLabel>
        <OutlinedInput
          id="question"
          name="question"
          type="text"
          placeholder="Write your question here..."
          minRows={5} // Set minimum number of rows
          style={{ width: '100%' }} // Allow textarea to take full width
          required
          value={question} // Controlled component
          onChange={(e) => setQuestion(e.target.value)}
        />
      </FormGrid>
      
      <FormGrid item xs={12} md={6}>
        <FormControlLabel
          control={
            <Checkbox
              name="option1"
              checked={selectedOptions.option1}
              onChange={handleCheckboxChange}
            />
          }
          label="Option 1"
        />
        <OutlinedInput
          id="option1"
          name="option1"
          type="text"
          placeholder="Enter the option"
          required
          value={givenOptions.option1} // Controlled component
          onChange={handleChange}
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormControlLabel
          control={
            <Checkbox
              name="option2"
              checked={selectedOptions.option2}
              onChange={handleCheckboxChange}
            />
          }
          label="Option 2"
        />
        <OutlinedInput
          id="option2"
          name="option2"
          type="text"
          placeholder="Enter the option"
          required
          value={givenOptions.option2} // Controlled component
          onChange={handleChange}
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormControlLabel
          control={
            <Checkbox
              name="option3"
              checked={selectedOptions.option3}
              onChange={handleCheckboxChange}
            />
          }
          label="Option 3"
        />
        <OutlinedInput
          id="option3"
          name="option3"
          type="text"
          placeholder="Enter the option"
          required
          value={givenOptions.option3} // Controlled component
          onChange={handleChange}
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormControlLabel
          control={
            <Checkbox
              name="option4"
              checked={selectedOptions.option4}
              onChange={handleCheckboxChange}
            />
          }
          label="Option 4"
        />
        <OutlinedInput
          id="option4"
          name="option4"
          type="text"
          placeholder="Enter the option"
          required
          value={givenOptions.option4} // Controlled component
          onChange={handleChange}
        />
      </FormGrid>
      
      <FormGrid item xs={12}>
        <FormLabel
          htmlFor="explanation"
          required
          style={{ fontSize: '1.5em', lineHeight: '2em' }} // Increased label size
        >
          Explanation
        </FormLabel>
        <OutlinedInput
          id="explanation"
          name="explanation"
          type="text"
          placeholder="Write your explanation here..."
          minRows={5} // Set minimum number of rows
          style={{ width: '100%' }} // Allow textarea to take full width
          required
          value={explanation} // Controlled component
          onChange={(e) => setExplanation(e.target.value)}
        />
      </FormGrid>

      <FormGrid item xs={12}>
      
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        
        <Button variant="contained" color="secondary" onClick={handleClickNext}>
          Save Question
        </Button>
      </FormGrid>
    </Grid>
  );
}
