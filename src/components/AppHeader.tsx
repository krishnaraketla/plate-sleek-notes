import React from 'react';
import NewNoteButton from "./NewNoteButton";
import { BiMoon as Moon, BiSun as Sun, BiMenu as MenuIcon, BiShareAlt as ShareIcon, BiDownload as DownloadIcon } from "react-icons/bi";

interface AppHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

function AppHeader({ darkMode, toggleDarkMode }: AppHeaderProps) {
  return (
    <header className={`fixed top-0 z-10 flex items-center justify-between w-full p-5 bg-opacity-100 ${darkMode ? "bg-white" : "bg-white"}`}>
      {/* Sidebar Icon */}
      <MenuIcon className="text-2xl cursor-pointer" />

      <div className="flex space-x-4">
        {/* New Note Button */}
        <NewNoteButton />

        {/* Share Button */}
        <button className="focus:outline-none">
          <ShareIcon className="text-2xl" />
        </button>

        {/* Download Button */}
        <button className="focus:outline-none">
          <DownloadIcon className="text-2xl" />
        </button>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="focus:outline-none">
          {darkMode ? <Sun className="text-gray-100" /> : <Moon className="text-gray-600" />}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
