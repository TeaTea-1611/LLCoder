import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks";
import { InputSearch } from "../../UI";

function QuickSeach() {
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {}, [debouncedSearchValue]);

  return (
    <div className="my-6">
      <InputSearch
        value={searchValue}
        onChange={(val) => setSearchValue(val)}
        placeholder="Quick search exercises"
      />
    </div>
  );
}

export default QuickSeach;
