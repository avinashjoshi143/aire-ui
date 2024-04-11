import React, { useRef, useState, useEffect, createRef } from 'react';
import styled, { keyframes  } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import bridgeVideo from '../../assets/banner-video/bridge_city.mp4'; // Only keeping one video import
import Logo from '../../assets/logos/newlogo.png';
import bannerLogo from '../../assets/logos/bannerlogo.png';

const NavContainer = styled.nav`
    height: 100vh;
    display: grid;
    grid-template-rows: 10% 40% 50%;
    position: relative;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  place-items: center start;
  padding-left: 1rem;
`;

const LogoImage = styled.img`
  width: 45px;
  height: auto;
`;

const MenuIcon = styled.div`
  margin-right: 1rem;
  justify-self: end;
`;

const MenuContainer = styled.div`
  display: grid;
  place-items: center start;
  padding-left: 1rem;
  white-space: nowrap;
  color: white;
  align-self: start;
  padding-top: 1rem;
  font-size: 2rem;
  overflow: hidden;
  position: relative;
  height: 2rem; /* Adjust as needed */

  @media (max-width: 768px) {
    white-space: wrap;
  }
`;

const TextAnimation = keyframes`
  0%, 90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const AnimatedText = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0; /* Initially hide the text */
  animation: ${TextAnimation} 10s linear; /* Change to 10s for 10-second appearance */
  animation-fill-mode: forwards; /* Keep the text visible after animation ends */
  display: ${props => (props.showText ? 'block' : 'none')};
`;



const ImageAboveMenuContainer = styled.div`
  display: grid;
  place-items: center start;
  align-self: end;
  padding-left: 1rem;
`;

const ImageAboveMenuImage = styled.img`
  max-width: 25%;
  max-height: 100%;
  @media screen and (max-width: 768px) {
    max-width: 35%;
  }
  @media screen and (max-width: 480px) {
    max-width: 50%;
  }
`;

const Nav = () => {
  const [menuTextIndex, setMenuTextIndex] = useState(0);
  const [showText, setShowText] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const videoRef = useRef(createRef());
  const video = bridgeVideo; // Keeping only one video

  const menuTexts = ['The future of Real Estate CRM is here', 'Built for Real Estate, Tested by Realtors', 'Manage. Automate. Focus on what really matters- Relationships', 'Streamlined workflow with Powerful AI', 'One Place, Endless Possibilities'];

  useEffect(() => {
    const interval = setInterval(() => {
      setMenuTextIndex((menuTextIndex + 1) % menuTexts.length);
    }, 10000); // Change text every 10 seconds
  
    return () => {
      clearInterval(interval);
    };
  }, [menuTextIndex, menuTexts]);

  useEffect(() => {
    const currentVideoElement = videoRef.current.current;
    if (currentVideoElement) {
      currentVideoElement.load();
      currentVideoElement.play();
    }
  }, [videoRef]);

  return (
    <NavContainer>
      <BackgroundVideo ref={videoRef} autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </BackgroundVideo>
      <LogoContainer>
        <LogoImage src={Logo} alt="Logo" />
        <MenuIcon>
          <FontAwesomeIcon icon={faBars} style={{ fontSize: '2rem', color: 'white' }} />
        </MenuIcon>
      </LogoContainer>
      <ImageAboveMenuContainer>
        <ImageAboveMenuImage src={bannerLogo} alt="Image Above Menu" />
      </ImageAboveMenuContainer>
      <MenuContainer>
      {menuTexts.map((text, index) => (
        <AnimatedText key={index} showText={menuTextIndex === index}>
          {text}
        </AnimatedText>
      ))}</MenuContainer>
    </NavContainer>
  );
};

export default Nav;
