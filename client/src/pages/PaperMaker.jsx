import styled from "styled-components";
import Questions from "../components/Questions";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";
import ImagesSliderDemo from "../components/ImagesSliderDemo"

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const PaperMaker = () => {
  const location = useLocation();
  const pgname = location.pathname.split("/")[1];
  const [filters, setFilters] = useState({});

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      {/* <ImagesSliderDemo /> */}
      <Title></Title>
      <Questions pgname={pgname}/>
    </Container>
  );
};

export default PaperMaker;