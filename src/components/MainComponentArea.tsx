import React from 'react';
import { Descendant } from 'slate';
import AppHeader from './AppHeader';
import RaketsEditor, { RaketsEditorType } from './RaketsEditor';
import PlateEditor from './PlateEditor';

interface MainComponentAreaProps {
    darkMode: boolean;
  }
  
  const MainComponentArea: React.FC<MainComponentAreaProps> = ({
    darkMode
  }) => {
    // Use a Tailwind utility class to add top padding that matches the header height
    return (
      <div className="flex flex-col w-full pt-16">
          <PlateEditor></PlateEditor>
      </div>
    );
  };

  export default MainComponentArea;
  