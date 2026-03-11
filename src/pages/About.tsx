import React from 'react';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import aboutImage from '../assets/about_collaboration.png';
import { useNavigate } from 'react-router-dom';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
  position: relative;
  z-index: 10;
`;

const TextParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 1.5rem;
  text-align: center;
`;

function About() {
  const navigate = useNavigate();

  return (
    <div className='page' style={{ backgroundColor: '#f7fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        
        <PageHeader 
          title="About Our Platform" 
          subtitle="Empowering Teams to Connect and Manage Resources" 
          titleLevel="h1" 
          showLines 
          padding="3rem 0"
        />

        <ImageWrapper>
          <StyledImage src={aboutImage} alt="Team Collaboration" />
        </ImageWrapper>

        <ContentWrapper>
          <TextParagraph>
            Welcome to the ultimate solution for modern teams. We bridge the gap between financial oversight and seamless communication. 
            Our platform allows you to rigorously track expenses, ensuring your budgets remain on point, while providing crystal-clear 
            video conferencing capabilities to keep your remote teams tightly knit and perfectly aligned.
          </TextParagraph>
          
          <TextParagraph>
            Built with security, speed, and user experience in mind, we aim to be the only tool your organization needs for daily operations 
            and strategic alignments. Whether you are a small startup or a growing enterprise, our tools scale directly with your ambitions.
          </TextParagraph>

          <div className="text-center" style={{ marginTop: '2rem' }}>
             <Button 
               variant="primary" 
               size="lg" 
               onClick={() => navigate('/login')}
             >
               Join Us Today
             </Button>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
}

export default About;
