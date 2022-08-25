import { useCallback, useState } from "react";
import { MarkdownEditor } from "../../components/Markdown";
import { MultiSelection } from "../../components/Selection";
import { Button, Input } from "../../components/UI";
import Testcase from "./Testcase";

function CreateExercisePage() {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const handleChangeMarkdownEditor = useCallback(
    (val: string) => {
      setMarkdown(val);
    },
    [setMarkdown]
  );

  return (
    <>
      <header>
        <h1 className="font-medium">Create Exercise</h1>
      </header>
      <div className="my-12">
        <form className="space-y-4">
          <div className="flex flex-row items-center space-x-4">
            <Input
              label="Name exercise"
              value={name}
              onChange={(val) => setName(val)}
            />
            <Input
              label="Source exercise"
              value={source}
              onChange={(val) => setSource(val)}
            />
          </div>
          <MultiSelection
            options={[]}
            onChange={(val) => setCategories(val)}
            placeholder="Select categories"
            className="z-10"
          />
          <MarkdownEditor
            value={markdown}
            onChange={handleChangeMarkdownEditor}
            placeholder="Aa"
          />
          <Testcase />
          <div className="flex">
            <Button type="submit" className="ml-auto">
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateExercisePage;
