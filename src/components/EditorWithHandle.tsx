import React from 'react';
import RaketsEditor from './RaketsEditor';
import DragHandle from './DragHandle';
import { RaketsEditorProps } from './RaketsEditor';

const EditorWithHandle: React.FC<RaketsEditorProps> = (props) => {
  return (
    <div className="">
      <div className="mr-1">
        <DragHandle />
      </div>
      <RaketsEditor {...props} />
    </div>
  );
};

export default EditorWithHandle;
