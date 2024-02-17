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


import { HrElement } from 'src/@/components/plate-ui/hr-element';
import { HeadingElement } from 'src/@/components/plate-ui/heading-element';
import { ParagraphElement } from 'src/@/components/plate-ui/paragraph-element';
import { TableElement } from 'src/@/components/plate-ui/table-element';
import { TableCellElement, TableCellHeaderElement } from 'src/@/components/plate-ui/table-cell-element';
import { TableRowElement } from 'src/@/components/plate-ui/table-row-element';
import { KbdLeaf } from 'src/@/components/plate-ui/kbd-leaf';
import { Editor } from 'src/@/components/plate-ui/editor';
import { EditorGhost } from 'src/@/components/plate-ui/editor-ghost';
import { FixedToolbar } from 'src/@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from 'src/@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from 'src/@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from 'src/@/components/plate-ui/floating-toolbar-buttons';
import { withPlaceholders } from 'src/@/components/plate-ui/placeholder';
import { withDraggables } from 'src/@/components/plate-ui/with-draggables';

const plugins = createPlugins(
    [
      createParagraphPlugin(),
      createHeadingPlugin(),
      createHorizontalRulePlugin(),
      createTablePlugin(),
      createBoldPlugin(),
      createItalicPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createKbdPlugin(),
      createDndPlugin({
          options: { enableScroller: true },
      }),
      createResetNodePlugin({
        options: {
          rules: [
            // Usage: https://platejs.org/docs/reset-node
          ],
        },
      }),
      createDeletePlugin(),
      createSoftBreakPlugin({
        options: {
          rules: [
            { hotkey: 'shift+enter' },
            {
              hotkey: 'enter',
              query: {
                allow: [
                  // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
                ],
              },
            },
          ],
        },
      }),
      createTabbablePlugin(),
      createDeserializeDocxPlugin(),
      createDeserializeCsvPlugin(),
      createDeserializeMdPlugin(),
      createJuicePlugin(),
    ],
    {
      components: withDraggables(withPlaceholders({
        [ELEMENT_HR]: HrElement,
        [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
        [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
        [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
        [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
        [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
        [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
        [ELEMENT_PARAGRAPH]: ParagraphElement,
        [ELEMENT_TABLE]: TableElement,
        [ELEMENT_TR]: TableRowElement,
        [ELEMENT_TD]: TableCellElement,
        [ELEMENT_TH]: TableCellHeaderElement,
        [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
        [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
        [MARK_KBD]: KbdLeaf,
        [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
        [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
        [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
        [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
      })),
    }
  );

  const initialValue = [
    {
      id: '1',
      type: 'p',
      children: [{ text: 'This is a Plate Editor' }],
    },
  ];
  
  export function PlateEditor() {

    const onChange = (newValue: any) => {
        console.log(JSON.stringify(newValue, null, 2));
      };


    return (
      <DndProvider backend={HTML5Backend}>
        <Plate plugins={plugins} initialValue={initialValue} onChange={onChange}>
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>
          
          <Editor />
          
        </Plate>
      </DndProvider>
    );
  }

  export default PlateEditor;