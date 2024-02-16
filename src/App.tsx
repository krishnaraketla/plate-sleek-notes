import React, { useState, useEffect, useCallback, useRef } from "react";
import { createEditor, Descendant, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withAutoSave } from "./auto-save/withAutoSave";
import { withHistory } from "slate-history";
import { createId } from "./utils";
import { ReactEditor } from 'slate-react';
import RaketsEditor, { RaketsEditorType } from "./components/RaketsEditor";
import AppHeader from "./components/AppHeader";
import NotebookSidebar from './components/NotebookSidebar';
import MainComponentArea from "./components/MainComponentArea";
import { Transforms } from "slate";
import { TooltipProvider } from "@radix-ui/react-tooltip";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const onChange = (value: Descendant[]) => {
    console.log("State", value);
  };

  return (
    <div className={`flex relative min-h-screen ${darkMode ? "bg-gray-100" : "bg-gray-100"}`}> {/* darkMode conditional can be added here */}      
      <div className="flex flex-col w-full"> {/* Main Area with margin for the sidebar */}
      <TooltipProvider>
        <AppHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <MainComponentArea darkMode={darkMode} />
       </TooltipProvider> 
      </div>
    </div>
  );
}

const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

export default App;
