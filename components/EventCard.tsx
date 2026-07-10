"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';

const EventCard = () => {
    const [activeTab, setActiveTab] = useState('birthday');

    // Dummy Birthday Data
    const birthdays = [
        {
            id: 1,
            name: "Sarah Johnson",
            date: "Friday, May 24",
            avatar: "🎂",
        },
        {
            id: 2,
            name: "John Doe",
            date: "Monday, May 27",
            avatar: "🎉",
        },
    ];

    // Dummy Anniversary Data
    const anniversaries = [
        {
            id: 1,
            name: "Alex Smith",
            years: 3,
            date: "Today",
            avatar: "✨",
        },
        {
            id: 2,
            name: "Emma Wilson",
            years: 5,
            date: "Tomorrow",
            avatar: "🥳",
        },
    ];

    return (
        <div className='w-full max-w-sm sm:max-w-md mx-auto mt-6 sm:mt-5 border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm bg-white'>

            {/* Tabs */}
            <div className='flex gap-1 p-1 bg-slate-100 rounded-xl mb-5 sm:mb-6'>
                <Button
                    onClick={() => setActiveTab('birthday')}
                    className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
                        activeTab === 'birthday'
                            ? 'bg-white text-slate-900 shadow-sm hover:bg-white'
                            : 'bg-transparent text-slate-500 hover:bg-slate-200/50 shadow-none'
                    }`}
                >
                    Birthday
                </Button>

                <Button
                    onClick={() => setActiveTab('anniversary')}
                    className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
                        activeTab === 'anniversary'
                            ? 'bg-white text-slate-900 shadow-sm hover:bg-white'
                            : 'bg-transparent text-slate-500 hover:bg-slate-200/50 shadow-none'
                    }`}
                >
                    Anniversary
                </Button>
            </div>

            {/* Content */}
            <div className='space-y-4'>
                {activeTab === 'birthday' ? (
                    birthdays.map((person) => (
                        <div
                            key={person.id}
                            className='flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50'
                        >
                            <div className='text-2xl'>{person.avatar}</div>

                            <div className='text-left'>
                                <h3 className='font-semibold text-slate-800'>
                                    {person.name}
                                </h3>

                                <p className='text-sm text-slate-500'>
                                    Birthday on {person.date}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    anniversaries.map((person) => (
                        <div
                            key={person.id}
                            className='flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50'
                        >
                            <div className='text-2xl'>{person.avatar}</div>

                            <div className='text-left'>
                                <h3 className='font-semibold text-slate-800'>
                                    {person.name}
                                </h3>

                                <p className='text-sm text-slate-500'>
                                    Celebrating {person.years} years • {person.date}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EventCard;