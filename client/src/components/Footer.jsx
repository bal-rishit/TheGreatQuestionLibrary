import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: black;
  padding: 40px 20px;
  color: white;
  flex-wrap: wrap;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 20px;
  min-width: 200px;
`;

const Title = styled.h3`
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Desc = styled.p`
  color: white;
  margin: 10px 0;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const SocialIcon = styled.a`
  color: #488cff;
  margin-right: 20px;
  font-size: 30px;
  &:hover {
    color: #1a73e8;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 20px;
`;

const Page = styled.li`
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 20px;
`;

const IconText = styled.span`
  color: white;
  margin-left: 10px;
`;

function Footer() {
  return (
    <Container>
      <Column>
        <Title>Question Tree.</Title>
        <Desc>
          Question Tree is a platform where you can share questions.
        </Desc>
        <SocialContainer>
          <SocialIcon href="#">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon href="#">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon href="#">
            <LinkedInIcon />
          </SocialIcon>
          <SocialIcon href="#">
            <XIcon />
          </SocialIcon>
        </SocialContainer>
      </Column>
      <Column>
        <Title>Contact Info</Title>
        <List>
          <ListItem>
            <LocationOnOutlinedIcon style={{color: "#488cff"}}/>
            <IconText>IIT Patna, Bihta 801106. Pvt Ltd.</IconText>
          </ListItem>
          <ListItem>
            <EmailOutlinedIcon style={{color: "#488cff"}}/>
            <IconText>contact@questiontree.com</IconText>
          </ListItem>
          <ListItem>
            <CallOutlinedIcon style={{color: "#488cff"}}/>
            <IconText>+91 123567890</IconText>
          </ListItem>
        </List>
      </Column>
      <Column>
        <Title>Company</Title>
        <List>
          <Page>
            <IconText>About Us</IconText>
          </Page>
          <Page>
            <IconText>Home</IconText>
          </Page>
          <Page>
            <IconText>Questions</IconText>
          </Page>
          {/* <Page>
            <IconText>Courses</IconText>
          </Page> */}
        </List>
      </Column>
    </Container>
  );
}

export default Footer;
