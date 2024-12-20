import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import QuestionCards from "./QuestionCards";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { publicRequest } from '../requestMethods';
import { mobile } from "../responsive";

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  margin-bottom: 10px; // Add margin-bottom to create space
  ${mobile({ marginRight: "0px" })}
`;

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

const QuestionGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const LeftFilter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CenterFilter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 10px 20px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; // Space between the search input and the button
  font-size: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

const Questions = ({ pgname }) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]); // To store selected questions
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await publicRequest.get("/submit", { withCredentials: true });
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getQuestions();
  }, []);

  useEffect(() => {
    const filteredQuestions = () => {
      let updatedQuestions = [...questions];
      if (filter.category) {
        updatedQuestions = updatedQuestions.filter((item) =>
          item.categories.includes(filter.category)
        );
      }
      if (searchTerm) {
        updatedQuestions = updatedQuestions.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredQuestions(updatedQuestions);
    };
    filteredQuestions();
  }, [filter, searchTerm, questions]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleQuestionClick = (item) => {
    if (pgname === "PaperMaker") {
      // Toggle selection
      if (selectedQuestions.includes(item)) {
        // If the question is already selected, remove it
        setSelectedQuestions(selectedQuestions.filter(q => q !== item));
      } else {
        // Otherwise, add the question to the selected list
        setSelectedQuestions([...selectedQuestions, item]);
      }
    }
  };

  const handleCreateClick = () => {
    navigate("/PreviewPaper", { state: { selectedQuestions } });
  };

  return (
    <>
      <FilterContainer>
        {/* <LeftFilter>
          <FilterText>Stream:</FilterText>
          <Select name="stream" onChange={handleFilterChange}>
            <Option value="">All</Option>
            <Option value="Science">Science</Option>
            <Option value="Commerce">Commerce</Option>
            <Option value="Arts">Arts</Option>
          </Select>

          <FilterText>Tags:</FilterText>
          <Select name="tags" onChange={handleFilterChange}>
            <Option value="">All</Option>
            <Option value="Physics">Physics</Option>
            <Option value="Chemistry">Chemistry</Option>
            <Option value="Mathematics">Mathematics</Option>
          </Select>
        </LeftFilter> */}
        {/* <div style={{ flex: 1 }} /> */}
        <CenterFilter>
          {/* <SearchInputContainer>
            <SearchIconWrapper>
              <FaSearch />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              placeholder="Search questions"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchInputContainer> */}
          
          {pgname === "PaperMaker" && selectedQuestions.length > 0 && (
            <CreateButton onClick={handleCreateClick}>Create</CreateButton>
          )}
        </CenterFilter>
        <div style={{ flex: 1 }} />
      </FilterContainer>
      <Container>
        <Title>Question Bank</Title>
        <QuestionGrid>
          {filteredQuestions.map((item) => (
            <QuestionCards
              key={item._id}
              item={item}
              isSelected={selectedQuestions.includes(item)} // Pass selection status
              onClick={() => handleQuestionClick(item)} // Handle card click
            />
          ))}
        </QuestionGrid>
      </Container>
    </>
  );
};

export default Questions;
