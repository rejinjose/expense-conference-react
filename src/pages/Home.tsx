import styled from 'styled-components';
import PageHeader from '../components/PageHeader'
import Man from '../assets/Man.png';
import concall from '../assets/concall.png';
import Button from '../components/Button';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  width: 350px;
`;

const LeftColumn = styled.div`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 10%;
    height: 80%;
    width: 2px;
    background-color: #989ba1;
  }
`;

const StyledDescriptionHeader = styled(PageHeader)`
  font-size: 20px;
  text-transform: uppercase;
  color: #666;
  line-height: 1.6;
  font-weight: 400;
`;

function Home() {
  return (
    <div className='page' style={{ backgroundColor: '#c0cad3'}}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <PageHeader titleLevel='h1' title="Manage Your Expenses & Connect via Video Calls" subtitleLevel='h2' showLines subtitle={`All in One Powerful App!`} />
          </div>
        </div>
      </div>
      <div className="container pad-top-30 pad-bottom-30">
        <div className="row align-items-center">
          <LeftColumn className="col-6">
            <PageHeader titleLevel='h2' title="Track Your Expenses"  />
            <ImageWrapper>
              <StyledImage src={Man} alt="Expense Tracker" />
            </ImageWrapper>
            <StyledDescriptionHeader titleLevel='h5' title="Easily add and manage your daily expenses. Stay on top of your spending with detailed reports."  />
            <div className='text-center'>
              <Button variant="primary" onClick={()=>alert('clicked')}>Add Your Expenses</Button>  
            </div>
          </LeftColumn>
          <div className="col-6">
            <PageHeader titleLevel='h2' title="Video Call & Conferencing"  />
            <ImageWrapper>
              <StyledImage src={concall} alt="Video Conferencing" />
            </ImageWrapper>
            <StyledDescriptionHeader titleLevel='h5' title="Make high-quality video calls with friends. familv. or coworkers. Host and join virtual meetings effortiessly."  />
            <div className='text-center'>
              <Button variant="primary" onClick={()=>alert('clicked')}>Start A Video Call</Button>  
            </div>
          </div>
        </div>
      </div>
      <div className="container pad-bottom-30" style={{ backgroundColor: '#eeeeee', borderRadius: '5px' }}>
        <div className="row">
          <div className="col-12">
            <PageHeader titleLevel='h2' title="Get Started Today" subtitleLevel='h2' subtitle={`Sign up now and experience all our features!`} />
            <div className="text-center">
              <Button variant="primary" onClick={()=>alert('clicked')}>Join Now</Button> 
            </div>            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;