'use client';
import { createPlugins, Plate, PlateContent } from '@udecode/plate-common';

const plugins = createPlugins(
    [
  
    ],
    {
      components: {
      },
    }
  );

  const initialValue = [
    {
      id: '1',
      type: 'p',
      children: [{ text: 'Hello, World!' }],
    },
  ];
  
  const PlateEditor : React.FC = () => {
    return (
        <Plate plugins={plugins} initialValue={initialValue}>
          <PlateContent />
        </Plate>
      );
  }
  export default PlateEditor;