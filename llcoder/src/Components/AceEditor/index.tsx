import AceEditor from "react-ace";
import { useState } from "react";
//ace-editor
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/ext-language_tools";
import { Selection } from "../Selection";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegClone } from "react-icons/fa";

interface AceEditorProps {
  onChange: (newValue: string) => void;
}

const MODE = [
  { label: "C++", value: "c_cpp" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "HTML", value: "html" },
];

const THEME = [
  { label: "Dracula", value: "dracula" },
  { label: "Monokai", value: "monokai" },
  { label: "Dreamweaver", value: "dreamweaver" },
];

const FONT_SIZE = [
  { label: "12", value: "12" },
  { label: "14", value: "14" },
  { label: "16", value: "16" },
  { label: "18", value: "18" },
  { label: "20", value: "20" },
  { label: "22", value: "22" },
];

function AceEditorCode({ onChange }: AceEditorProps) {
  const [mode, setMode] = useState(MODE[0]);
  const [theme, setTheme] = useState(THEME[0]);
  const [fontSize, setFontSize] = useState(FONT_SIZE[2]);
  const [value, setValue] = useState("");

  const handleChange = (val: string) => {
    setValue(val);
    onChange(val);
  };

  return (
    <div>
      <div className="my-4">
        <div className="flex space-x-2">
          <Selection
            defaultValue={mode}
            className="z-10 w-40"
            options={MODE}
            onChange={(val) => setMode(val.value as any)}
          />
          <Selection
            defaultValue={theme}
            className="z-10 w-40"
            options={THEME}
            onChange={(val) => setTheme(val.value as any)}
          />
          <Selection
            defaultValue={fontSize}
            className="z-10 w-20"
            options={FONT_SIZE}
            onChange={(val) => setFontSize(val.value as any)}
          />
        </div>
      </div>
      <div className="relative">
        <AceEditor
          mode={mode.value}
          theme={theme.value}
          onChange={handleChange}
          name="app_code_editor"
          editorProps={{ $blockScrolling: true }}
          fontSize={parseInt(fontSize.value)}
          className="peer"
          style={{
            width: "100%",
            height: "500px",
            zIndex: "0",
          }}
          setOptions={{
            showPrintMargin: false,
            cursorStyle: "smooth",
          }}
        />
        <CopyToClipboard text={value}>
          <button className="absolute z-10 top-1 right-2 bg-slate-300/20 p-2 rounded cursor-pointer hover:text-primary hover:bg-slate-300/40 hidden hover:block peer-hover:block">
            <FaRegClone />
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default AceEditorCode;
