import { useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { Button } from "../../../Components/Tags";
import SearchExrcises from "../SearchExrcises";

function HeaderExercisesPage() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <header className="relative flex items-center">
      <h1 className="font-medium">Exercises</h1>
      <div className="flex items-center ml-auto space-x-2">
        <Button onClick={() => setIsOpenSearch(true)}>
          <BsSearch size={16} />
        </Button>
        <SearchExrcises
          isOpen={isOpenSearch}
          onClose={() => setIsOpenSearch(false)}
        />
        <Button>
          <BsPlusLg size={16} />
        </Button>
      </div>
    </header>
  );
}

export default HeaderExercisesPage;
