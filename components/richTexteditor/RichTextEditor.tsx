import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  //   tableUI: true,
  //   justify: {},
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
interface RichTextEditorProps {
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onChange,
  placeholder,
  value,
  defaultValue,
}) => {
  return (
    <ReactQuill
      style={{ background: "#fff" }}
      theme="snow"
      value={value}
      onChange={onChange && onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder ?? ""}
    />
  );
};
