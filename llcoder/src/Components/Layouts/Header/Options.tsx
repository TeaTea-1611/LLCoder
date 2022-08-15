import { BsMoonStars, BsTranslate } from "react-icons/bs";
import Menu from "../../Menu";
import { LANGS, THEME } from "./Item";

function Options() {
  return (
    <div className="space-x-4 pl-6 border-l border-slate-300 lg:flex items-center relative">
      <Menu
        className="w-32"
        data={THEME}
        onChange={(value) => {
          console.log(value);
        }}
      >
        <BsMoonStars size={18} />
      </Menu>
      <Menu
        className="w-28"
        data={LANGS}
        onChange={(value) => {
          console.log(value);
        }}
      >
        <BsTranslate size={18} />
      </Menu>
    </div>
  );
}

export default Options;
