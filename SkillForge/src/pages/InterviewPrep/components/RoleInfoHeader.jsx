import { div } from 'framer-motion/client'
import React from 'react'

function RoleInfoHeader({ role, topicsToFocus, experience, questions, description, lastUpdated }) {
    return (
        <div className='relative'>
            <div className='container mx-auto px-4 md:px-16'>
                <div className='overflow-visible  h-[200px] flex flex-col justify-center relative z-10'>
                    <div className='flex items-start'>
                        <div className='flex grow'>
                            <div className='flex justify-between items-start'>
                                <div>
                                    <h2 className='text-7xl leading-[1.2] font-medium text-transparent bg-clip-text 
                   bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] 
                   bg-[length:200%_200%] animate-text-shine font-semibold'>{role}</h2>
                                    <p className='text-sm font-medium text-gray-900 mt-1'>{topicsToFocus}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 mt-4'>
                        <div className='text-sm md:text-base bg-white/20 font-semibold text-black bg-transparent border border-black/30 px-4 py-2 rounded-full'>
                            Experience: {experience} {experience == 1 ? "Year" : "Years"}
                        </div>
                        <div className='text-sm md:text-base bg-white/20 font-semibold text-black bg-transparent border border-black/30 px-4 py-2 rounded-full'>
                            {questions} Q&A
                        </div>
                        <div className='text-sm md:text-base bg-white/20 font-semibold text-black bg-transparent border border-black/30 px-4 py-2 rounded-full'>
                            Last Updated: {lastUpdated}
                        </div>
                    </div>
                </div>

                <div className='w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center overflow-hidden absolute top-0 left-0'>
                    <div className='w-16 h-16 bg-lime-400 blur-[65px] animate-blob1'></div>
                    <div className='w-16 h-16 bg-teal-400 blur-[65px] animate-blob2'></div>
                    <div className='w-16 h-16 bg-cyan-400 blur-[65px] animate-blob3'></div>
                    <div className='w-16 h-16 bg-fuchsia-400 blur-[65px] animate-blob4'></div>
                </div>
            </div>
        </div>
    )
}

export default RoleInfoHeader