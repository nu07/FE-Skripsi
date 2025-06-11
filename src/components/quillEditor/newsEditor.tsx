import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  content: string;
  setContent: (val: string) => void;
  readOnly? : boolean
}

const QuillEditor: React.FC<QuillEditorProps> = ({ content, setContent, readOnly = true }) => {
  const modules = {
    toolbar: readOnly ? false :   [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="w-full min-h-[400px]">
      <ReactQuill
        theme="snow"
        value={content}
        modules={modules}
        onChange={setContent}
        className="h-[300px]"
        readOnly={readOnly}
      />
    </div>
  );
};

export default QuillEditor;
