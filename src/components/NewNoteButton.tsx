import React from 'react';
import { BiSolidPlusSquare } from "react-icons/bi";


const NewNoteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
      <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
        <BiSolidPlusSquare className="mr-2" />
      </button>
    );
  };
  

export default NewNoteButton;
