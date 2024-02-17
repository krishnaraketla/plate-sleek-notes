'use client';

import { createPlateUI } from './create-plate-ui';
import { createBasicElementsPlugin } from '@udecode/plate-basic-elements';
import { createBasicMarksPlugin } from '@udecode/plate-basic-marks';
import { createPlugins, Plate } from '@udecode/plate-common';

import { Editor } from 'src/@/components/plate-ui/editor';
import { FloatingToolbar } from 'src/@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from 'src/@/components/plate-ui/floating-toolbar-buttons';

export function EditorGhost() {
  const plugins = createPlugins(
    [createBasicElementsPlugin(), createBasicMarksPlugin()],
    { components: createPlateUI() }
  );

  return (
    <div className="mt-[72px] p-10">
      <Plate plugins={plugins}>
        <Editor placeholder="Type your message here." variant="ghost" />
      </Plate>
    </div>
  );
}
