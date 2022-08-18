import { useState } from "react";
import AceEditorCode from "../../components/AceEditor";
import { Textarea } from "../../components/UI";

function Codepad() {
  const [code, setCode] = useState("");

  return (
    <div>
      <h1>Codepad</h1>
      <AceEditorCode onChange={(val) => setCode(val)} />
      <Textarea label="Input" value={""} onChange={(val) => {}} />
    </div>
  );
}

export default Codepad;
