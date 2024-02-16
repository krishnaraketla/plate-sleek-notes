'use client';
import { PlateContent } from '@udecode/plate-common';
import { withProps } from '@udecode/cn';
import { createPlugins, Plate, PlateLeaf } from '@udecode/plate-common';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { createHorizontalRulePlugin, ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { createTablePlugin, ELEMENT_TABLE, ELEMENT_TR, ELEMENT_TD, ELEMENT_TH } from '@udecode/plate-table';
import { createBoldPlugin, MARK_BOLD, createItalicPlugin, MARK_ITALIC, createUnderlinePlugin, MARK_UNDERLINE, createStrikethroughPlugin, MARK_STRIKETHROUGH, createSubscriptPlugin, MARK_SUBSCRIPT, createSuperscriptPlugin, MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';
import { createKbdPlugin, MARK_KBD } from '@udecode/plate-kbd';
import { createDndPlugin } from '@udecode/plate-dnd';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { createDeletePlugin } from '@udecode/plate-select';
import { createSoftBreakPlugin } from '@udecode/plate-break';
import { createTabbablePlugin } from '@udecode/plate-tabbable';
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx';
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv';
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';
import { createJuicePlugin } from '@udecode/plate-juice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import { HrElement } from '@/components/plate-ui/hr-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableCellElement, TableCellHeaderElement } from '@/components/plate-ui/table-cell-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { withDraggables } from '@/components/plate-ui/with-draggables';

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