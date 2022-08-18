import { useCallback, useState } from "react";
import { EditText } from "../../../components/EditText";
import { MarkdownEditor } from "../../../components/Markdown";
import { MultiSelection } from "../../../components/Selection";
import { Button, Input } from "../../../components/UI";
import Testcase from "./Testcase";

function CreateExercisePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const handleChangeEditText = useCallback(
    (val: string) => {
      setDescription(val);
    },
    [setDescription]
  );

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
        <form className="flex flex-col space-y-4">
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
          <div className="flex flex-row items-center space-x-4 z-10">
            <MultiSelection
              options={[
                { label: "Category 1", value: "category1" },
                { label: "Category 2", value: "category2" },
                { label: "Category 3", value: "category3" },
                { label: "Category 4", value: "category4" },
                { label: "Category 5", value: "category5" },
                { label: "Category 6", value: "category6" },
                { label: "Category 7", value: "category7" },
                { label: "Category 8", value: "category8" },
                { label: "Category 9", value: "category9" },
                { label: "Category 10", value: "category10" },
                { label: "Category 11", value: "category11" },
                { label: "Category 12", value: "category12" },
                { label: "Category 13", value: "category13" },
                { label: "Category 14", value: "category14" },
                { label: "Category 15", value: "category15" },
                { label: "Category 16", value: "category16" },
                { label: "Category 17", value: "category17" },
                { label: "Category 18", value: "category18" },
                { label: "Category 19", value: "category19" },
                { label: "Category 20", value: "category20" },
              ]}
              onChange={(val) => setCategories(val)}
              placeholder="Select categories"
            />
          </div>
          <EditText value={description} onChange={handleChangeEditText} />
          <MarkdownEditor
            value={markdown}
            onChange={handleChangeMarkdownEditor}
            placeholder="Write markdown here..."
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
