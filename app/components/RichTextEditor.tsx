"use client";
import { useRef } from "react";

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) execCmd("createLink", url);
  };

  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) execCmd("insertImage", url);
  };

  return (
    <div className="border rounded">
      <div className="flex gap-1 p-2 border-b bg-gray-50 flex-wrap">
        <button type="button" onClick={() => execCmd("bold")} className="px-3 py-1 border rounded hover:bg-gray-200" title="Bold"><b>B</b></button>
        <button type="button" onClick={() => execCmd("italic")} className="px-3 py-1 border rounded hover:bg-gray-200" title="Italic"><i>I</i></button>
        <button type="button" onClick={() => execCmd("underline")} className="px-3 py-1 border rounded hover:bg-gray-200" title="Underline"><u>U</u></button>
        <button type="button" onClick={() => execCmd("insertUnorderedList")} className="px-3 py-1 border rounded hover:bg-gray-200" title="Bullet List">• List</button>
        <button type="button" onClick={() => execCmd("insertOrderedList")} className="px-3 py-1 border rounded hover:bg-gray-200" title="Numbered List">1. List</button>
        <button type="button" onClick={() => execCmd("formatBlock", "<h2>")} className="px-3 py-1 border rounded hover:bg-gray-200" title="Heading">H2</button>
        <button type="button" onClick={() => execCmd("formatBlock", "<h3>")} className="px-3 py-1 border rounded hover:bg-gray-200" title="Subheading">H3</button>
        <button type="button" onClick={() => execCmd("formatBlock", "<p>")} className="px-3 py-1 border rounded hover:bg-gray-200" title="Paragraph">P</button>
        <button type="button" onClick={addLink} className="px-3 py-1 border rounded hover:bg-gray-200" title="Add Link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        </button>
        <button type="button" onClick={addImage} className="px-3 py-1 border rounded hover:bg-gray-200" title="Insert Image">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        className="p-4 min-h-[200px] focus:outline-none prose max-w-none"
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}
