import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import robot1 from "../Images/robot1.jpg";
import robot2 from "../Images/robot2.jpeg";
import robot3 from "../Images/robot3.jpg";

const CarouselContainer = styled.div`
  width: 80%;
  margin: auto;
  padding-top: 50px;
  background-color: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const SlideContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SlideImage = styled.img`
  width: 100%;
  max-width: 300px; 
  height: auto;
  border-radius: 8px;
`;

const SlideTitle = styled.h3`
  margin-top: 20px;
  text-align: center;
`;

const SlideText = styled.p`
  text-align: center;
  color: #666;
`;

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <CarouselContainer>
      <SectionTitle>What Science Tree Offers</SectionTitle>
      <Slider {...settings}>
        <div>
          <SlideContent>
            <SlideImage src={robot1} alt="Thumbs up" />
            <SlideText>Thumbs up 63%</SlideText>
          </SlideContent>
        </div>
        <div>
          <SlideContent>
            <SlideImage src={robot2} alt="Robotics" />
            <SlideTitle>Robotics</SlideTitle>
            <SlideText>
              Dive into the exciting world of robotics with our hands-on kits! Designed to inspire creativity and problem-solving skills, our robotics kits offer a fun way for kids to learn and explore technology.
            </SlideText>
          </SlideContent>
        </div>
        <div>
          <SlideContent>
            <SlideImage src={robot3} alt="Coding" />
            <SlideTitle>Coding</SlideTitle>
            <SlideText>
              Ignite a passion for coding with our dynamic camps! From beginner to advanced levels, our courses offer a pathway for students to develop essential coding skills.
            </SlideText>
          </SlideContent>
        </div>
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;
