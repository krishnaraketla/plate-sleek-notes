import NewNoteButton from "./NewNoteButton";
import { BiMoon as Moon, BiSun as Sun } from "react-icons/bi";

interface AppHeaderProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    addEditorBelow: () => void;
  }
  
  function AppHeader({ darkMode, toggleDarkMode, addEditorBelow }: AppHeaderProps) {
    return (
      <div className={`fixed flex w-full justify-between p-5 max-w-screen-xl mx-auto left-64 ${darkMode ? "bg-gray-900" : "bg-gray-200"}`}> {/* Conditional darkMode */}
        <NewNoteButton onClick={addEditorBelow} />
        <button onClick={toggleDarkMode} className="text-2xl focus:outline-none">
          {darkMode ? <Sun className="text-gray-100" /> : <Moon />}
        </button>
      </div>
    );
  }

  export default AppHeader;