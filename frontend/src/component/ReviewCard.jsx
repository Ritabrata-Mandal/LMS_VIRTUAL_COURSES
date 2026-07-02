import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";


const ReviewCard = ({comment,rating,photUrl,name,description,courseTitle}) => {
  return (
    <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full'>

        <div className='flex items-center mb-3 text-yellow-400 text-sm'>
            {
                Array(5).fill(0).map((_,idx)=>(
                    <span key={idx}>
                        {idx < rating ? <FaStar /> : <FaRegStar />}
                    </span>
                ))
            }
        </div>

        <p className='text-gray-700 text-sm'>Review For : <span className='font-semibold'>{courseTitle}</span></p>
        <p className='text-gray-700 text-sm mb-5'>Comment : <span className='font-semibold'>{comment}</span></p>
        <div className='flex items-center gap-2'>
            {photUrl ? (
                <img
                    src={photUrl}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    👤
                </div>
            )}

            <div>
                <h2 className='font-semibold text-gray-800 text-sm'>{name}</h2>
                <p className='text-gray-500 text-xs'>{description}</p>
            </div>

        </div>

    </div>
  )
}

export default ReviewCard