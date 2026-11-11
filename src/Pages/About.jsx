import React from 'react'
import Rider from '../Components/About/Rider';
import AnimationRider from '../Components/About/AnimationRider';
import Status from '../Components/About/Status';
import Intro from "../Components/About/Intro"
import ReviewCard from '../Components/common/ReviewCard';
import TeamCard from '../Components/About/TeamCard';
import AboutCta from '../Components/About/AboutCta';

const About = () => {
  return (
    <main className='about-page'>
      <Rider />
      <Status />
      <Intro />
      <TeamCard />
      <section className='customer-stories'>
        <div className='text-center'>
          <span className='eyebrow'>Kind words from our table</span>
          <h2 className='section-heading'>Meals worth talking about</h2>
        </div>
        <ReviewCard />
      </section>
      <AnimationRider />
      <AboutCta />
    </main>
  )
}

export default About