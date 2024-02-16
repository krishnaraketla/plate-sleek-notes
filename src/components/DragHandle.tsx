import React from 'react';
import { BiGridSmall } from 'react-icons/bi';

type DragHandleProps = {
};

const DragHandle: React.FC<DragHandleProps> = () => {
  return (
    <div
      draggable="true"
      style={{ cursor: 'grab' }}
    >
      <BiGridSmall className="dark:text-gray-200"/>
    </div>
  );
};

export default DragHandle;
