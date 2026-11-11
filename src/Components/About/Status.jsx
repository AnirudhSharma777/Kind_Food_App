import React from 'react'
import { achivements } from '../../Data/Achivement';
const Status = () => {


  return (
    <section className='about-values'>
        <div className='container'>
            <div className='text-center mb-4'>
                <span className='eyebrow'>The good stuff</span>
                <h2 className='section-heading'>A few things we believe in</h2>
            </div>
            <div className='about-stats'>
            {
                achivements.map((item) => (
                    <div className='stat-item' key={item.id}>
                        <span className='stat-number'>{item.value}</span>
                        <p>{item.name}</p>
                    </div>
                ))
            }
            </div>
        </div>
    </section>
  )
}

export default Status;