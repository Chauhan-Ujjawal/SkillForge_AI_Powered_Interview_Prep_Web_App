import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/usercontext";

function Navbar({ setOpenAuthModal }) {
  const { user } = useContext(UserContext);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-white/20 bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-10">
      {/* Left: Logo text same as header */}
      <div className="text-xl text-black font-bold">
        <Link to={"/dashboard"}>SkillForge : Interview Prep AI</Link>
      </div>
        <ProfileInfoCard />
    </header>
  );
}

export default Navbar;
