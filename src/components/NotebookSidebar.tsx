import React, { useState } from 'react';

interface Notebook {
  id: string;
  name: string;
}

interface NotebookSidebarProps {
  notebooks: Notebook[];
  onAddNotebook: () => void;
  onDeleteNotebook: (id: string) => void;
  onRenameNotebook: (id: string, newName: string) => void;
}

const NotebookSidebar: React.FC<NotebookSidebarProps> = ({notebooks, onAddNotebook, onDeleteNotebook, onRenameNotebook}) => {
  const [selectedNotebook, setSelectedNotebook] = useState<string | null>(null);

  const onSelectNotebook = (name: string) => {
    setSelectedNotebook(name);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold">Wingbooks</h3>
      <ul>
        {notebooks.map((notebook) => (
          <li key={notebook.id} className={`${selectedNotebook === notebook.name ? 'bg-blue-300' : ''}`}>
            <button onClick={() => onSelectNotebook(notebook.name)}>{notebook.name}</button>
            <button onClick={() => onDeleteNotebook(notebook.id)} className="border rounded px-2 py-1 ml-2">Delete</button>
            <button onClick={() => onRenameNotebook(notebook.id, 'newName')} className="border rounded px-2 py-1 ml-2">Rename</button>
          </li>
        ))}
      </ul>
      <button onClick={onAddNotebook} className="border rounded px-4 py-2 mt-4">Add Notebook</button>
    </div>
  );
};

export default NotebookSidebar;
