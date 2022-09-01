import { useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { Button } from "../../components/UI";
import SearchExrcises from "./SearchExrcises";

function HeaderExercisesPage() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <>
      <header className="relative flex items-center">
        <h1>Exercises</h1>
        <div className="items-center ml-auto space-x-2">
          <Button onClick={() => setIsOpenSearch(true)} title="Search">
            <BsSearch size={16} />
          </Button>
          <Button to="create" title="Add Exercise">
            <BsPlusLg size={16} />
          </Button>
        </div>
      </header>
      <SearchExrcises
        isOpen={isOpenSearch}
        onClose={() => setIsOpenSearch(false)}
      />
    </>
  );
}

export default HeaderExercisesPage;
