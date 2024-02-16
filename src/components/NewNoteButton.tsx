import React from 'react';
import { BiNote } from "react-icons/bi"; // Import a note icon from react-icons

const NewNoteButton: React.FC = () => {
  return (
    <button className="focus:outline-none">
      <BiNote className="text-2xl"/> {/* Adjusted the icon size for better visual */}
    </button>
  );
};

export default NewNoteButton;
