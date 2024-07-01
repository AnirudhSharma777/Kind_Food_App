import React from 'react'
import {Container, Row} from 'react-bootstrap';
import Rider from '../Components/About/Rider';
import AnimationRider from '../Components/About/AnimationRider';
import Status from '../Components/About/Status';
import Intro from "../Components/About/Intro"
import ReviewCard from '../Components/common/ReviewCard';

const About = () => {
  return (
    <div className=''>
      <Container fluid className='w-100'>
        <Row>
          <Rider/>
        </Row>
        <Status/>
        <ReviewCard/>
        <AnimationRider/>
      </Container>
    </div>
  )
}

export default About