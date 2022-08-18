import { useState } from "react";
import { InputSearch } from "../../UI";

function QuickSeach() {
  const [searchValue, setSearchValue] = useState("");

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
