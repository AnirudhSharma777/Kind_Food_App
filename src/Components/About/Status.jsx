import React from 'react'

const Status = () => {

    const achivements = [
        {
            id:1,
            name: 'Years Of Happiness',
            value:'15'
        },
        {
            id:2,
            name: 'Employees Worldwide',
            value:'2k+'
        },
        {
            id:3,
            value: '99%',
            name:'Positive Feedback'
        },
        {
            id:4,
            name: 'Successfully Completed Projects',
            value:'100+'
        }
    ]
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