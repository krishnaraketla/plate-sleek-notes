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

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "", id: createId() }],
    id: createId(),
  },
];

interface Notebook {
  id: string;
  name: string;
  editors: RaketsEditorType[];
}

function App() {
  const [editors, setEditors] = useState<RaketsEditorType[]>([]);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [focusedEditorIndex, setFocusedEditorIndex] = useState<number | null>(null);
  const editorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [selectedNotebook, setSelectedNotebook] = useState<string | null>(null);

  useEffect(() => {
    setNotebooks([]);
  }, []);

  useEffect(() => {
    if (selectedNotebook) {
      const notebook = notebooks.find(n => n.id === selectedNotebook);
      setEditors(notebook ? notebook.editors : []);
    }
  }, [selectedNotebook, notebooks]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const addNotebook = () => {
    const newId = `${notebooks.length + 1}`;
    const newNotebook: Notebook = { id: newId, name: `Notebook ${newId}`, editors: [] };
    setNotebooks([...notebooks, newNotebook]);
  };

  const deleteNotebook = (id: string) => {
    setNotebooks(notebooks.filter((notebook) => notebook.id !== id));
  };

  const renameNotebook = (id: string, newName: string) => {
    const updatedNotebooks = notebooks.map((notebook) =>
      notebook.id === id ? { ...notebook, name: newName } : notebook
    );
    setNotebooks(updatedNotebooks);
  };

  const onChange = (value: Descendant[]) => {
    console.log("State", value);
  };

  const addEditorBelow = () => {
    const newEditor = withHistory(withAutoSave(withReact(createEditor()))) as ReactEditor;
    const newEditorObj = { editor: newEditor, uid: createId(), value: [...initialValue] };

    setEditors(prevEditors => {
      if (focusedEditorIndex !== null) {
        const indexToInsert = focusedEditorIndex + 1;
        return [
          ...prevEditors.slice(0, indexToInsert),
          newEditorObj,
          ...prevEditors.slice(indexToInsert)
        ];
      } else {
        return [...prevEditors, newEditorObj];
      }
    });
    setTimeout(() => {
      ReactEditor.focus(newEditor);
    }, 0);

    setTimeout(() => {
        Transforms.select(newEditor, Editor.end(newEditor, []));
        ReactEditor.focus(newEditor);
     }, 20);
  };

  return (
    <div className={`flex relative min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-200"}`}> {/* darkMode conditional can be added here */}
      {/*
      <div className="fixed flex flex-col bg-gray-300 w-64 h-screen">
        <NotebookSidebar notebooks={notebooks} onAddNotebook={addNotebook} onDeleteNotebook={deleteNotebook} onRenameNotebook={renameNotebook} />
      </div>   
      */}
      
      <div className="flex flex-col w-full"> {/* Main Area with margin for the sidebar */}
        <AppHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} addEditorBelow={addEditorBelow} />
        <MainComponentArea
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          addEditorBelow={addEditorBelow}
          editors={editors}
          setEditors={setEditors}
          focusedEditorIndex={focusedEditorIndex}
          setFocusedEditorIndex={setFocusedEditorIndex}
          onChange={onChange}
        />
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
