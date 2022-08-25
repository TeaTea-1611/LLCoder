import { useState } from "react";
import { Textarea } from "../../components/UI";

function Testcase() {
  const [totalTestcases, setTotalTestcases] = useState(5);
  const [testcases, setTestcases] = useState("");
  return (
    <div className="space-y-2">
      <h3>Testcase</h3>

      <div className="flex space-x-2">
        <div className="w-full">
          <Textarea
            label="Input"
            value={testcases}
            onChange={(val) => setTestcases(val)}
          />
        </div>
        <div className="w-full">
          <Textarea
            label="Input"
            value={testcases}
            onChange={(val) => setTestcases(val)}
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="w-full">
          <Textarea
            label="Input"
            value={testcases}
            onChange={(val) => setTestcases(val)}
          />
        </div>
        <div className="w-full">
          <Textarea
            label="Input"
            value={testcases}
            onChange={(val) => setTestcases(val)}
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="w-full">
          <Textarea
            label="Input"
            value={testcases}
            onChange={(val) => setTestcases(val)}
          />
        </div>
        <div className="w-full">
          <Textarea
            label="Input"
            value={testcases}
            onChange={(val) => setTestcases(val)}
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="w-full">
          <Textarea
            label="Input"
            value={testcases}
            onChange={(val) => setTestcases(val)}
          />
        </div>
        <div className="w-full">
          <Textarea
            label="Input"
            value={testcases}
            onChange={(val) => setTestcases(val)}
          />
        </div>
      </div>
    </div>
  );
}

export default Testcase;
