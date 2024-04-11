import React, { useRef, useState, } from 'react';
import styled from 'styled-components';
import ADC from '../../assets/feature-icons/automated_drip_campaigns.png';
import LM from '../../assets/feature-icons/listings_management.png';
import MB from '../../assets/feature-icons/manage_budget.png';
import ML from '../../assets/feature-icons/manage_leads.png';
import MT from '../../assets/feature-icons/manage_team.png';
import OMC from '../../assets/feature-icons/omnichannel_communication.png';
import CB from '../../assets/feature-icons/custom_chatbot.png';


const FeaturesContainer = styled.div`
  grid-row: 3 / span 1;
  display: grid;
  grid-template-rows: 20% 80%;
  gap: 1rem;
`;

const FirstRow = styled.div`
  display: grid;
  place-items: center;
  font-size: 2.2rem;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const SecondRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
`;

const ArrowLeft = styled.div`
  justify-self: center;
  cursor: pointer;
`;

const ArrowRight = styled.div`
  justify-self: center;
  cursor: pointer;
`;

const CardSlider = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
`;

const Card = styled.div`
  flex: 0 0 calc(33.33% - 40px); /* Adjust width to include gap */
  margin-right: 20px; /* Add gap between cards */
  margin-left: 20px;
  scroll-snap-align: start;
  background-color: #f9f9f9;
  padding: 1rem;
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 0.5rem;
  text-align: center;
  position: relative;
  border-radius: 20px; /* Add border-radius for rounded corners */
  height: 325px; /* Increase the height of the cards */
  transform: ${({ isCenter }) => (isCenter ? 'scale(1.1)' : 'scale(1)')};
  box-shadow: ${({ isCenter }) =>
    isCenter
      ? '0 0 20px rgba(0, 0, 0, 0.3)' /* Add a uniform shadow effect to the center card */
      : 'none'};
  transition: transform 0.3s, box-shadow 0.3s;

  @media (max-width: 768px) {
    flex: 0 0 calc(50% - 20px); /* Two cards per row on medium screens */
  }

  @media (max-width: 480px) {
    flex: 0 0 calc(100% - 20px); /* One card per row on small screens */
  }
`;

const CardContainer = styled.div`
  display: flex;
  width: 380%; /* Triple the width to accommodate 3 cards */
  height: 380px;
  padding-top: 2%;
  transition: transform 0.5s ease; /* Smooth transition for scrolling */
  overflow-x: hidden; /* Hide the overflow to prevent horizontal scroll */
  overflow-y: hidden;
`;


const Icon = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 100px;
    height: 100px;
  }
`;


const FeatureName = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
`;

const FeatureDescription = styled.div``;

const Features = () => {
  const [features, setFeatures] = useState([
    { icon: ADC, name: "Automated Drip Campaigns", description: "Improve lead engagement & boost conversation by seamless delivery of personalized emails" },
    { icon: LM, name: "Listings Management", description: "Streamline listings by keeping property details, necessary documents & landing pages in one centralized hub" },
    { icon: MB, name: "Manage Budget", description: "Optimize spending & keep your costs in check" },
    { icon: ML, name: "Manage Leads", description: "Organize, track & nurture leads into happy customers" },
    { icon: MT, name: "Manage Team", description: "Cohesively collaborate, communicate, track progress & celebrate wins together" },
    { icon: OMC, name: "Omni-channel Communication", description: "Seamlessly connect with customers accross different channels of communication, fostering stronger relationships" },
    { icon: CB, name: "Customized Chatbot", description: "Streamline the process of gathering information & providing personalized recommendations to potential clients" },
  ]);
  const cardSliderRef = useRef(null);

  const scrollLeft = () => {
    if (cardSliderRef.current) {
      cardSliderRef.current.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      cardSliderRef.current.style.transform = "translateX(calc(-33.333% - 40px))"; // Adjust for gap between cards
      setTimeout(() => {
        const firstCard = features.shift();
        features.push(firstCard);
        setFeatures([...features]);
        cardSliderRef.current.style.transition = "none";
        cardSliderRef.current.style.transform = "translateX(0)";
      }, 0);
    }
  };
  
  const scrollRight = () => {
    if (cardSliderRef.current) {
      const lastCard = features.pop();
      setFeatures([lastCard, ...features]);
      cardSliderRef.current.style.transition = "none";
      cardSliderRef.current.style.transform = "translateX(calc(-33.333% - 40px))"; // Adjust for gap between cards
      setTimeout(() => {
        cardSliderRef.current.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        cardSliderRef.current.style.transform = "translateX(0)";
      }, 0);
    }
  };  


  return (
    <FeaturesContainer>
      <FirstRow>
        Features
      </FirstRow>
      <SecondRow>
        <ArrowLeft onClick={scrollLeft}>{`⮜`}</ArrowLeft>
        <CardSlider>
          <CardContainer ref={cardSliderRef}>
            {features.map((feature, index) => (
              <Card key={index} isCenter={index === 1}>
                <Icon src={feature.icon} />
                <FeatureName>{feature.name}</FeatureName>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </Card>
            ))}
            {features.map((feature, index) => (
              <Card key={index + features.length}>
                <Icon src={feature.icon} />
                <FeatureName>{feature.name}</FeatureName>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </Card>
            ))}
          </CardContainer>
        </CardSlider>
        <ArrowRight onClick={scrollRight}>{`⮞`}</ArrowRight>
      </SecondRow>
    </FeaturesContainer>
  );
};

export default Features;
