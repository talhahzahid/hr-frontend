import { MessageCircle, ThumbsUp, UserRound } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import welcome from "../public/welcome.png"

const FeedCard = () => {
    return (
        /* 
           Outer div: Mobile pe padding kam kar di (p-2), 
           taki side space waste na ho.
        */
        <div className='p-2 sm:p-5 flex justify-center'>
            {/* 
               Main Card: 
               w-full: Mobile par poori width lega.
               sm:w-[600px]: Tablet/Desktop par width fix ho jayegi (apne hisab se adjust karein).
               max-w-full: Screen se bahar nahi jayega.
            */}
            <div className='border w-full sm:w-150 rounded-md p-3 bg-white shadow-sm'>
                <div className='flex justify-between items-start mb-4'>
                    {/* User Info */}
                    <div>
                        <div className='flex items-center gap-3'>
                            <div className='p-2 bg-gray-100 rounded-full'>
                                <UserRound size={20} />
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='font-bold text-sm sm:text-base leading-tight'>System Administrator</h2>
                                <h3 className='text-xs text-gray-500'>Administrator, Human Resource</h3>
                            </div>
                        </div>
                    </div>
                    {/* Time */}
                    <div className='text-xs text-gray-400'>
                        One Month
                    </div>
                </div>

                {/* Profile Section */}
                <div className='flex flex-col items-center mb-4'>
                    <div className='p-3 bg-blue-50 rounded-full mb-2'>
                        <UserRound size={32} className='text-blue-600' />
                    </div>
                    <div className='flex flex-col text-center'>
                        <span className='font-bold text-lg'>Umar Shahid</span>
                        <span className='font-semibold text-sm text-gray-600'>Associate Software Engineer</span>
                    </div>
                </div>

                {/* Image Section */}
                <div className='relative w-full mb-3 overflow-hidden rounded-lg'>
                    <Image
                        src={welcome}
                        alt='Welcome'
                        className='w-full h-auto object-cover'
                        priority
                    />
                </div>

                {/* Onboard Info */}
                <div className='flex justify-between mb-4 border-b pb-2'>
                    <span className='italic text-xs text-gray-500'>Hired on April 13, 2026</span>
                    <span className='text-xs font-bold text-blue-800'>WebHR</span>
                </div>

                {/* Like/Comment Section */}
                <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
                        <span>2</span>
                        <ThumbsUp className="w-4 h-4" />
                        <span>Like</span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
                        <MessageCircle className="w-4 h-4" />
                        <span>Comment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCard