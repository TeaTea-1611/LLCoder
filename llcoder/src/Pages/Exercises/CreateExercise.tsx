import { useCallback, useState } from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { MarkdownEditor } from "../../components/Markdown";
import { MultiSelection, Selection } from "../../components/Selection";
import { Button, Input, Textarea } from "../../components/UI";
import { useInfoCreateExerciseQuery } from "../../generated/graphql";

const TOTAL_TESTCASE = 0;

function CreateExercisePage() {
  const [title, setTitle] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [fileOutput, setFileOutput] = useState("");
  const [time, setTime] = useState("1.0");
  const [xp, setXp] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [content, setContent] = useState("");
  const [exerciseForm, setExerciseForm] = useState<number[]>([]);
  const [testcase, setTestcase] = useState(() => {
    let tc: { input: string; output: string }[] = [];
    [...Array(TOTAL_TESTCASE)].forEach((_) => {
      tc.push({ input: "", output: "" });
    });
    return tc;
  });
  const [totalTestcase, setTotalTestcase] = useState(TOTAL_TESTCASE);

  const { data } = useInfoCreateExerciseQuery();

  const handleChangeMarkdownEditor = useCallback(
    (val: string) => {
      setContent(val);
    },
    [setContent]
  );

  const handleChangeTestcase = (
    value: string,
    type: "input" | "output",
    index: number
  ) => {
    setTestcase((prev) => {
      const newTestcase = [...prev];
      if (!!newTestcase[index]) newTestcase[index][type] = value;
      return newTestcase;
    });
  };

  const handleSetTotalTestcase = (type: "add" | "remove") => {
    if (type === "add") {
      if (totalTestcase >= 20) return;
      setTestcase((prev) => [...prev, { input: "", output: "" }]);
      setTotalTestcase(totalTestcase + 1);
    } else if (type === "remove") {
      if (totalTestcase <= 0) return;
      setTestcase((prev) => prev.slice(0, -1));
      setTotalTestcase(totalTestcase - 1);
    }
  };

  return (
    <>
      <header>
        <h1 className="font-medium">Th??m B??i T???p M???i</h1>
      </header>
      <div className="my-12">
        <form className="space-y-4">
          <div className="flex flex-row items-center space-x-4">
            <Input
              label="T??n b??i t???p"
              value={title}
              onChange={(val) => setTitle(val)}
            />
            <Input
              label="File input"
              value={fileInput}
              onChange={(val) => setFileInput(val)}
              className="w-60"
              placeholder="????? tr???ng l?? nh???p chu???n"
            />
            <Input
              label="File output"
              value={fileOutput}
              onChange={(val) => setFileOutput(val)}
              className="w-60"
              placeholder="????? tr???ng l?? nh???p chu???n"
            />
            <Input
              label="Th???i gian (gi??y)"
              value={time}
              onChange={(val) => setTime(val)}
              className="w-40"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="z-20 w-40">
              <span>Thang ??i???m: </span>
              <Selection
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
              <span>????? kh??: </span>
              <Selection
                options={[{ label: "easy", value: 1 }]}
                onChange={(op) => {
                  setDifficulty(op.value.toString());
                }}
              />
            </div>
            <div className="z-20 w-40">
              <span>Th??? lo???i: </span>
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
            <span>D???ng b??i: </span>
            <MultiSelection
              placeholder="#Ch??a x??c ?????nh"
              options={
                data?.infoCreateExercise.exercises_form?.map((i) => ({
                  label: i.name_vi,
                  value: i.id,
                })) || []
              }
              onChange={(op) => {
                const values = op.map((it) => Number(it.value));
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
          <div className="space-y-2">
            <h3 className="">Testcase</h3>
            <div className="space-y-2">
              {[...Array(totalTestcase)].map((_, i) => (
                <div key={i} className="flex space-x-2">
                  <Textarea
                    label={`Input ${i + 1}`}
                    value={testcase[i]?.input || ""}
                    onChange={(val) => handleChangeTestcase(val, "input", i)}
                  />
                  <Textarea
                    label={`Output ${i + 1}`}
                    value={testcase[i]?.output || ""}
                    onChange={(val) => handleChangeTestcase(val, "output", i)}
                  />
                </div>
              ))}
            </div>
            <div className="space-x-2">
              <Button
                type="button"
                title="X??a testcase"
                onClick={() => handleSetTotalTestcase("remove")}
              >
                <BiMinus />
              </Button>
              <Button
                type="button"
                title="Th??m testcase"
                onClick={() => handleSetTotalTestcase("add")}
              >
                <BsPlus />
              </Button>
            </div>
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
