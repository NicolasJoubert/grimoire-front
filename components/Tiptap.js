'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<b>Hello World! 🌎️</b>',
  })

  return <EditorContent editor={editor} />
}

export default Tiptap
