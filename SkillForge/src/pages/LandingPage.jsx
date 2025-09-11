import React, { useState } from 'react'
import HERO_IMG from '../assets/image.png';
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu'
import Modal from '../component/Loader/Modal';
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import { UserContext } from '../context/usercontext';
import { useContext } from 'react';
import ProfileInfoCard from "../component/Cards/ProfileInfoCard"
const LandingPage = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("Login");
    const handleCTA = () => {
        if (!user) {
            setOpenAuthModal(true)
        } else {
            navigate("/Dashboard")
        }
    };
    return (
        <>
            <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-white/20 bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-10">
                <div className="text-xl text-black font-bold">
                    SkillForge : Interview Prep AI
                </div>
                {user ? (
                    <ProfileInfoCard />
                ) : (
                    <button
                        className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:brightness-90 hover:opacity-90 border border-white transition-colors cursor-pointer"
                        onClick={() => setOpenAuthModal(true)}
                    >
                        Login / Signup
                    </button>)}
            </header>
            <div className="w-full  min-h-[50vh] relative z-10  ">
                <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
                    {/* Header */}

                    {/*Hero Content*/}
                    <div className="flex flex-col md:flex-row  items-center">
                        <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
                            <div className="flex items-center justify- mb-2">
                                <div className="google-border">
                                    <div className="inner flex items-center gap-2 text-[13px] text-black-600 font-semibold">
                                        <LuSparkles /> Powered by Google Gemini
                                    </div>
                                </div>
                            </div>
                            <h1 className='text-5xl text-black font-medium mb-6 leading-tight'>
                                Ace Interviews with <br />
                                <span className='text-transparent bg-clip-text 
                   bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] 
                   bg-[length:200%_200%] animate-text-shine font-semibold'>
                                    AI-powered
                                </span>{" "}
                                Learning
                            </h1>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
                                Get role-specific questions, expand answers when you need them,
                                dice deeper into concepts, and organize everyting your way.
                                From preparation to mastery - your ultimate insterview toolkit is
                                here.
                            </p>
                            <button className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-white hover:text-black border border-black-50 hover:black-yellow-300 transition-colors cursor-pointer" onClick={handleCTA}>
                                Get started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full  min-h-full  relative z-10 '>
                <div>
                    <section className='flex items-center justify-center -mt-36'>
                        <img src={HERO_IMG} className='w-[80vw] rounded-lg' />
                    </section>
                </div>
                <div className='w-full main-h-full mt-10'>
                    <div className='container mx-auto px-4 pt-10 pb-20'>
                        <section className='mt-5'>
                            <h2 className='text-3xl font-medium text-center text-white mb-12'>
                                Features That Makes You Shine
                            </h2>
                            <div className='flex flex-col items-center gap-8'>
                                {/* First 3 Cards */}
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                                    {APP_FEATURES.slice(0, 3).map((features) => (
                                        <div
                                            key={features.id}
                                            className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs border border-black transition transform duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-black'
                                        >
                                            <h3 className='text-base font-semibold mb-3'>{features.title}</h3>
                                            <p className='text-gray-600'>{features.description}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Last 2 Cards */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                                    {APP_FEATURES.slice(3).map((feature) => (
                                        <div
                                            key={feature.id}
                                            className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs border border-black transition transform duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-black'
                                        >
                                            <h3 className='text-base font-semibold mb-3'>{feature.title}</h3>
                                            <p className='text-gray-600'>{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5'>Ujjawal.Dev</div>
            </div>
            <Modal isOpen={openAuthModal} onClose={() => {
                setOpenAuthModal(false);
                setCurrentPage("Login");
            }}
                hideHeader>
                <div >
                    {currentPage == "Login" && (<Login setCurrentPage={setCurrentPage} />)}
                    {currentPage == "Signup" && (<Signup setCurrentPage={setCurrentPage} />)}
                </div>
            </Modal>
        </>
    )
}
export default LandingPage;