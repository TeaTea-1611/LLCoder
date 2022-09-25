import { useState } from "react";
import { ModalForm } from "../../components/Modal";
import { Selection } from "../../components/Selection";
import { Button, Input } from "../../components/UI";

function Search({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchValue, setSearchValue] = useState({
    name: "",
    author: "",
  });

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Search Exercises">
      <form className="mt-8 w-100 space-y-4">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
          <Input
            label="Tên bài tập"
            className="w-full"
            value={searchValue.name}
            onChange={(val) => setSearchValue({ ...searchValue, name: val })}
          />
          <Input
            label="Tác giả"
            className="w-full"
            value={searchValue.author}
            onChange={(val) => setSearchValue({ ...searchValue, author: val })}
          />
          <Selection
            options={[
              { value: "Arithmetic", label: "Arithmetic" },
              { value: "Logic", label: "Logic" },
            ]}
            className="z-10"
            placeholder="Category"
            onChange={(value) => console.log(value)}
          />
          <Selection
            options={[
              { value: "Easy", label: "Easy" },
              { value: "Medium", label: "Medium" },
              { value: "Hard", label: "Hard" },
            ]}
            className="z-10"
            placeholder="Difficulty"
            onChange={(value) => console.log(value)}
          />
          <Selection
            options={[
              { value: "Arithmetic", label: "Arithmetic" },
              { value: "Logic", label: "Logic" },
            ]}
            placeholder="Category"
            onChange={(value) => console.log(value)}
          />
          <Selection
            className="z-[1]"
            options={[
              { value: "Easy", label: "Easy" },
              { value: "Medium", label: "Medium" },
              { value: "Hard", label: "Hard" },
            ]}
            placeholder="Difficulty"
            onChange={(value) => console.log(value)}
          />
        </div>
        <div className="flex">
          <Button type="submit" className="ml-auto">
            Search
          </Button>
        </div>
      </form>
    </ModalForm>
  );
}

export default Search;
