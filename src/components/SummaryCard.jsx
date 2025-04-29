import React from 'react'

function SummaryCard({icon,text,number,color}) {
  return (
    <div className='rounded flex bg-white'>
    <div className={`text-3xl flex justify-center ${color} items-center text-white px-4`}>
           {icon}
        </div>
        <div className='pl-4 py-3 mx-3'>
            <p className='text-lg font-bold'>{text}</p>
            <p className='text-xl font-semibold'>{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard