import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ProfileIcon from "./ProfileDropdown";
import LogoUrl from "../Images/Logo.png";

const Header = styled.header`
  position: relative;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #0066b2;
  color: white;
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 120px;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 3px;
  background-color: white;
  transition: transform 0.3s, opacity 0.3s;

  &.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  &.open:nth-child(2) {
    opacity: 0;
  }

  &.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  p {
    font-size: 25px;
  }
  img {
    max-width: 100px;
    height: auto;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #333;
    padding: 10px 0;

    &.show {
      display: flex;
    }
  }
`;

const NavLink = styled(Link)`
  margin-right: 20px;
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  transition: background-color 0.3s;
  border-bottom: ${(props) => (props.active ? "2px solid #ffffff" : "none")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const LoginButton = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #333;
    transition: 300ms;
  }
`;

function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation(); // Use location to determine current path

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Header className="navbar">
      <MobileMenu className="mobile-menu" onClick={toggleMenu}>
        <Line className={`line ${showMenu ? "open" : ""}`} />
        <Line className={`line ${showMenu ? "open" : ""}`} />
        <Line className={`line ${showMenu ? "open" : ""}`} />
      </MobileMenu>
      <Logo className="logo">
        <Link to="/">
        <img src={LogoUrl} alt="Logo" style={{ width: '45px', height: 'auto' }} />
        </Link>
        <p>Prashn</p>
      </Logo>
      <NavLinks className={`nav-links ${showMenu ? "show" : ""}`}>
        <NavLink to="/" className="nav-link" active={location.pathname === "/"}>
          Home
        </NavLink>
        {user && (
          <NavLink
            to="/QuestionMaker"
            className="nav-link"
            active={location.pathname === "/QuestionMaker"}
          >
            Question Maker
          </NavLink>
        )}
        <NavLink
          to="/Questions"
          className="nav-link"
          active={location.pathname === "/Questions"}
        >
          Questions
        </NavLink>
        {user && (
          <NavLink
            to="/PaperMaker"
            className="nav-link"
            active={location.pathname === "/PaperMaker"}
          >
            Paper Maker
          </NavLink>
        )}
      </NavLinks>
      {user ? (
        <ProfileIcon />
      ) : (
        <LoginButton className="login-button">
          <Link to="/Login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        </LoginButton>
      )}
    </Header>
  );
}

export default Navbar;
