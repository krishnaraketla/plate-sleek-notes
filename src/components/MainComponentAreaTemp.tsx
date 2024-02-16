import React from 'react';
import { Descendant } from 'slate';
import AppHeader from './AppHeader';
import RaketsEditor, { RaketsEditorType } from './RaketsEditor';

interface MainComponentAreaProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    addEditorBelow: () => void;
    editors: RaketsEditorType[];
    setEditors: React.Dispatch<React.SetStateAction<RaketsEditorType[]>>;
    focusedEditorIndex: number | null;
    setFocusedEditorIndex: React.Dispatch<React.SetStateAction<number | null>>;
    onChange: (value: Descendant[]) => void;
  }
  
  const MainComponentArea: React.FC<MainComponentAreaProps> = ({
    darkMode,
    toggleDarkMode,
    addEditorBelow,
    editors,
    setEditors,
    focusedEditorIndex,
    setFocusedEditorIndex,
    onChange,
  }) => {
    return (
      <div className="flex flex-col w-full">
        {editors.map((raketsEditor, index) => {
          const editorProps = {
            key: raketsEditor.uid,
            editor: raketsEditor.editor,
            value: raketsEditor.value,
            setEditors,
            editors,
            darkMode,
            focusedEditorIndex,
            setFocusedEditorIndex,
            onChange,
            onFocus: () => setFocusedEditorIndex(index),
          };
  
          return <RaketsEditor {...editorProps} />;
        })}
      </div>
    );
  };

  export default MainComponentArea;
  