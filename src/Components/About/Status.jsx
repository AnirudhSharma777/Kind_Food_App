import React from 'react'
import { achivements } from '../../Data/Achivement';
const Status = () => {


  return (
    <div className='bg-light p-2'>
        <div className='mt-4 h-25'></div>
        <div className='d-flex justify-content-evenly align-items-center flex-wrap '>
            {
                achivements.map((item) => (
                    <div className='d-flex flex-column align-items-center gap-2' key={item.id}>
                        <h4 className='text-primary text-hover'>{item.value}</h4>
                        <p>{item.name}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Status;