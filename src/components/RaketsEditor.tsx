import React, { forwardRef } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { withAutoSave } from "../auto-save/withAutoSave";
import { withHistory } from "slate-history";
import { ReactEditor } from 'slate-react';
import { Ref } from 'react';
import { createEditor, Descendant, Editor } from "slate";
import { createId } from "../utils";
import { Transforms } from "slate";

export type RaketsEditorType = {
    editor: ReactEditor;
    uid: string;
    value: Descendant[];
};

export type RaketsEditorProps = {
  editor: ReactEditor;
  value: Descendant[];

  setEditors: React.Dispatch<React.SetStateAction<RaketsEditorType[]>>;
  editors: RaketsEditorType[];

  focusedEditorIndex: number | null;
  setFocusedEditorIndex: React.Dispatch<React.SetStateAction<number | null>>;

  onChange: (value: Descendant[]) => void;

  darkMode: boolean;

  ref?: Ref<HTMLDivElement>;

  onFocus: () => void;


};

const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "", id: createId() }],
      id: createId(),
    },
  ];

const RaketsEditor: React.FC<RaketsEditorProps> = forwardRef<HTMLDivElement, RaketsEditorProps>(
  ({ editor, value, onChange,setEditors, editors, darkMode, focusedEditorIndex, setFocusedEditorIndex,onFocus}, forwardedRef) => {

    const deleteEditor = () => {
        if (focusedEditorIndex === null) {
          // No editor is currently focused, so we can't delete anything
          return;
        }
      
        setEditors(prevEditors => {
          const updatedEditors = [
            ...prevEditors.slice(0, focusedEditorIndex),
            ...prevEditors.slice(focusedEditorIndex + 1)
          ];
      
          // If there are still editors left after deletion, focus the next one or the previous one
          setTimeout(() => {
            if (updatedEditors.length > 0) {
              const nextEditorIndex = focusedEditorIndex >= updatedEditors.length ? updatedEditors.length - 1 : focusedEditorIndex;
              if (ReactEditor.isFocused(updatedEditors[nextEditorIndex].editor) || !document.hasFocus()) {
                return;
              }
              setFocusedEditorIndex(nextEditorIndex);
              ReactEditor.focus(updatedEditors[nextEditorIndex].editor);
            }else {
                setFocusedEditorIndex(null);
              }
          }, 0);
      
          return updatedEditors;
        });
      };


      const duplicateEditor = () => {
        if (focusedEditorIndex === null) return;
      
        const editorToDuplicate = editors[focusedEditorIndex];
        const duplicatedEditor = {
          editor: withHistory(withAutoSave(withReact(createEditor()))) as ReactEditor,
          uid: createId(),
          value: [...editorToDuplicate.value], // This spreads the value into a new array
        };
      
        setEditors(prevEditors => {
          const updatedEditors = [
            ...prevEditors.slice(0, focusedEditorIndex + 1),
            duplicatedEditor,
            ...prevEditors.slice(focusedEditorIndex + 1),
          ];
          return updatedEditors;
        });
      
        // Set the focus on the new editor after duplication
        setFocusedEditorIndex(focusedEditorIndex + 1);
        setTimeout(() => {
          Transforms.select(duplicatedEditor.editor, Editor.end(duplicatedEditor.editor, []));
          ReactEditor.focus(duplicatedEditor.editor);
        }, 20);
      };
      
      
  
      // Use useEffect to focus on the new editor when focusedEditorIndex changes
      React.useEffect(() => {
        if (focusedEditorIndex !== null && focusedEditorIndex < editors.length) {
          ReactEditor.focus(editors[focusedEditorIndex].editor);

        }
      }, [focusedEditorIndex, editors]);

      


      const addEditorAbove = () => {
        addEditorAtPosition("above");
      };
    
      const addEditorBelow = () => {
        addEditorAtPosition("below");
      };
    
      const addEditorAtPosition = (position: "above" | "below") => {
        const newEditor = withHistory(withAutoSave(withReact(createEditor()))) as ReactEditor;
        const newEditorObj = { editor: newEditor, uid: createId(), value: [...initialValue] };
    
        setEditors(prevEditors => {
          if (focusedEditorIndex !== null) {
            const indexToInsert = position === "above" ? focusedEditorIndex : focusedEditorIndex + 1;
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
    
      const focusNextEditor = (currentIndex: number) => {
        if (currentIndex + 1 < editors.length) {
          ReactEditor.focus(editors[currentIndex + 1].editor);
          setTimeout(() => {
            Transforms.select(editors[currentIndex + 1].editor, Editor.end(editors[currentIndex + 1].editor, []));
         }, 20);
        }
      };
    
      const focusPreviousEditor = (currentIndex: number) => {
        if (currentIndex - 1 >= 0) {
          ReactEditor.focus(editors[currentIndex - 1].editor);
          setTimeout(() => {
            Transforms.select(editors[currentIndex - 1].editor, Editor.end(editors[currentIndex - 1].editor, []));
         }, 20);
        }
      };

    return (
      <div ref={forwardedRef} className="-mt-10 -mb-10">
        <div className={`App flex justify-center items-center py-12`}>
          <Slate editor={editor} initialValue={value} onChange={onChange}>
            <Editable
              onFocus={onFocus}
              placeholder="Whats on your mind?"
              className={`min-w-full md:min-w-0 w-full md:w-2/3 lg:w-1/2 p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800 text-white focus:ring-indigo-500"
                  : "bg-white text-gray-900 focus:ring-indigo-200"
              } overflow-auto`}
              onKeyDown={(event) => {
                if (!event.ctrlKey) {
                  return;
                }
                if (event.key === "Enter") { 
                  event.preventDefault();
                  addEditorBelow();
                }
                switch (event.key) {
                  case "b": {
                    event.preventDefault();
                    Editor.addMark(editor, "bold", true);
                    console.log("Bold");
                    break;
                  }
                  case "d": {
                      event.preventDefault();
                      deleteEditor();
                      break;
                  }
                  case "w": {
                    event.preventDefault();
                    addEditorBelow();
                    break;
                  }
                  case "q": {
                    event.preventDefault();
                    addEditorAbove();
                    break;
                  }
                  case "s": {
                    console.log("Arrow down")
                    event.preventDefault();
                    if(focusedEditorIndex != null)
                    focusNextEditor(focusedEditorIndex);
                    break;
                  }
                  case "u": {
                    console.log("Arrow down")
                    event.preventDefault();
                    if(focusedEditorIndex != null)
                    focusPreviousEditor(focusedEditorIndex);
                    break;
                  }
                  case "c": {
                    event.preventDefault();
                    duplicateEditor();  
                    if(focusedEditorIndex != null)
                    focusNextEditor(focusedEditorIndex);
                    break;
                  }
                }
              }}
            />
          </Slate>
        </div>
      </div>
    );
  }
);

export default RaketsEditor;
