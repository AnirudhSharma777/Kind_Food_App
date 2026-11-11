import React from 'react'
import { Container } from 'react-bootstrap'
import rider from '../../assets/bikeRider.jpg'

const AnimationRider = () => {
  return (
    <section className='rider-container' aria-label='Delivery with care'>
        <Container>
          <div className='rider-promo'>
            <div className='rider-copy'>
              <span className='eyebrow'>Good food, on its way</span>
              <h2>A little care goes a long way.</h2>
              <p>From our kitchen to your table, every delivery is part of the experience.</p>
            </div>
            <div className='rider-art' aria-hidden='true'>
              <span className='rider-art-orbit' />
              <img src={rider} alt='' />
              <span className='rider-art-label'>Made to feel at home</span>
            </div>
          </div>
        </Container>
        <div className='rider-accent' aria-hidden='true' />
    </section>
  )
}

export default AnimationRider