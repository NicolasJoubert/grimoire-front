import { Extension } from '@tiptap/core';

const ManageBlocsExtension = Extension.create({
    name: 'manageBlocs',
  
    addKeyboardShortcuts() {
      return {
        'Mod-Shift-C': () => this.editor.chain().focus().setContent('<p>Custom content inserted!</p>').run(),
        'Backspace': () => {
          console.log('Custom shortcut triggered!');
          return true; // Return `true` to prevent default behavior
        },
      };
    },
  });

export default ManageBlocsExtension