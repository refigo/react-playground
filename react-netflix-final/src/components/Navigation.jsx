import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, transparent);
  z-index: 99;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  margin-right: 50px;
  font-size: 2.5rem;
  font-weight: 900;
  color: ${(props) => props.theme.red};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: -1px;
  cursor: pointer;
  
  span {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: scale(1.1);
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  position: relative;
  transition: color 0.3s ease-in-out;
  color: ${(props) => props.$isActive ? props.theme.white.lighter : props.theme.white.darker};
  
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }

  a {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    font-weight: ${(props) => props.$isActive ? "600" : "400"};
    font-size: 16px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${(props) => props.theme.red};
      transform: scaleX(${(props) => (props.$isActive ? 1 : 0)});
      transition: transform 0.3s ease-in-out;
    }
  }

  &:hover a::after {
    transform: scaleX(1);
  }
`;

function Navigation() {
  const location = useLocation();

  return (
    <Nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Col>
        <Link to="/">
          <Logo>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              REFIFLIX
            </motion.span>
          </Logo>
        </Link>
        <Items>
          <Item $isActive={location.pathname === "/"}>
            <Link to="/">Home</Link>
          </Item>
          <Item $isActive={location.pathname === "/coming-soon"}>
            <Link to="/coming-soon">Coming Soon</Link>
          </Item>
          <Item $isActive={location.pathname === "/now-playing"}>
            <Link to="/now-playing">Now Playing</Link>
          </Item>
        </Items>
      </Col>
    </Nav>
  );
}

export default Navigation;
