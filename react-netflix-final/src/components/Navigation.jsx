import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, useScroll, useAnimation } from "framer-motion";
import { useEffect } from "react";

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
  z-index: 99;
  background: ${props => props.$scrolled ? 'rgba(20, 20, 20, 0.95)' : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, transparent)'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  margin-right: 50px;
  font-size: 2rem;
  font-weight: 900;
  color: ${(props) => props.theme.red};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-right: 20px;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  position: relative;
  margin-right: 20px;
  transition: color 0.3s ease-in-out;
  color: ${(props) => props.$isActive ? props.theme.white.lighter : props.theme.white.darker};
  
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }

  a {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    font-size: 1rem;
    font-weight: ${(props) => props.$isActive ? "600" : "400"};
    white-space: nowrap;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
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

  @media (max-width: 768px) {
    margin-right: 10px;
    
    a {
      padding: 5px;
      font-size: 0.9rem;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

function Navigation() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 80) {
        navAnimation.start({
          backgroundColor: "rgba(20, 20, 20, 0.95)",
          backdropFilter: "blur(10px)",
        });
      } else {
        navAnimation.start({
          backgroundColor: "transparent",
          backdropFilter: "none",
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [scrollY, navAnimation]);

  return (
    <Nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      }}
      $scrolled={scrollY.get() > 80}
    >
      <Col>
        <Link to="/">
          <Logo>REFIFLIX</Logo>
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
