import { useCallback, useState } from "react";
import { MarkdownEditor } from "../../components/Markdown";
import { MultiSelection, Selection } from "../../components/Selection";
import { Button, Input, Textarea } from "../../components/UI";
import { useInfoCreateExerciseQuery } from "../../generated/graphql";
import Testcase from "./Testcase";

function CreateExercisePage() {
  const [title, setTitle] = useState("");
  const [fileInput, setFileInput] = useState("input.txt");
  const [fileOutput, setFileOutput] = useState("output.txt");
  const [time, setTime] = useState("1");
  const [xp, setXp] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [content, setContent] = useState("");
  const [exerciseForm, setExerciseForm] = useState<(string | number)[]>([]);

  const { data } = useInfoCreateExerciseQuery();

  const handleChangeMarkdownEditor = useCallback(
    (val: string) => {
      setContent(val);
    },
    [setContent]
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
              label="Title"
              value={title}
              onChange={(val) => setTitle(val)}
            />
            <Input
              label="File input"
              value={fileInput}
              onChange={(val) => setFileInput(val)}
              className="w-40"
            />
            <Input
              label="File output"
              value={fileOutput}
              onChange={(val) => setFileOutput(val)}
              className="w-40"
            />
            <Input
              label="Time (s)"
              value={time}
              onChange={(val) => setTime(val)}
              className="w-24"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="z-20 w-40">
              <span>Point: </span>
              <Selection
                // defaultValue={{ label: "5", value: 5 }}
                options={[
                  { label: "5", value: 5 },
                  { label: "10", value: 10 },
                ]}
                onChange={(op) => {
                  setXp(op.value.toString());
                }}
              />
            </div>
            <div className="z-20 w-40">
              <span>Difficulty: </span>
              <Selection
                defaultValue={{ label: "easy", value: 1 }}
                options={[{ label: "easy", value: 1 }]}
                onChange={(op) => {
                  setDifficulty(op.value.toString());
                }}
              />
            </div>
            <div className="z-20 w-40">
              <span>Thể loại: </span>
              <Selection
                options={
                  data?.infoCreateExercise.categories?.map((i) => ({
                    label: i.name,
                    value: i.id,
                  })) || []
                }
                onChange={(op) => {
                  setDifficulty(op.value.toString());
                }}
              />
            </div>
          </div>
          <div>
            <span>Dang bai: </span>
            <MultiSelection
              options={
                data?.infoCreateExercise.exercises_form?.map((i) => ({
                  label: i.name_vi,
                  value: i.id,
                })) || []
              }
              onChange={(op) => {
                const values = op.map((it) => it.value);
                setExerciseForm(values);
              }}
              className="z-10 w-full"
            />
          </div>
          <MarkdownEditor
            value={content}
            onChange={handleChangeMarkdownEditor}
            placeholder="Aa"
          />
          <div className="grid grid-cols-2 gap-2">
            <Textarea label="Input" value="a" onChange={() => {}} />
            <Textarea label="Output" value="" onChange={() => {}} />
          </div>
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
