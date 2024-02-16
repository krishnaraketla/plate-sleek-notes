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

    const onChange = (newValue: any) => {
        console.log(JSON.stringify(newValue, null, 2));
      };

      
    return (
        <Plate plugins={plugins} initialValue={initialValue} onChange={onChange}>
          <PlateContent />
        </Plate>
      );
  }
  export default PlateEditor;